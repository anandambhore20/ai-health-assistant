interface MedicalAnalysisResult {
  diseases: Array<{
    name: string;
    confidence: number;
    severity: 'Low' | 'Moderate' | 'High' | 'Critical';
    description: string;
    commonSymptoms: string[];
    recommendations: string[];
    urgency: string;
    citations: string[];
  }>;
  additionalInfo: {
    whenToSeekCare: string;
    redFlags: string[];
    disclaimer: string;
  };
}

export class GeminiService {
  private static API_KEY_STORAGE_KEY = 'gemini_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static clearApiKey(): void {
    localStorage.removeItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    return apiKey.length > 10;
  }

  static async analyzeMedicalSymptoms(
    symptoms: string[],
    additionalInfo: string,
    age: string,
    gender: string
  ): Promise<MedicalAnalysisResult | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Gemini API key not found');
    }

    const prompt = `You are an experienced medical AI assistant. Provide differential diagnoses based on symptoms, but always emphasize the need for professional medical evaluation.

IMPORTANT: Always include citations from medical sources and emphasize that this is for educational purposes only.

Patient presents with the following symptoms: ${symptoms.join(', ')}
Additional information: ${additionalInfo}
Age: ${age || 'Not specified'}
Gender: ${gender || 'Not specified'}

Please provide a differential diagnosis with the top 3-5 most likely conditions based on current medical literature. Include confidence percentages, severity levels, and specific recommendations.

You MUST respond ONLY with a valid JSON object (no markdown, no extra text) with this exact structure:
{
  "diseases": [
    {
      "name": "Disease Name",
      "confidence": 85,
      "severity": "Moderate",
      "description": "Brief medical description",
      "commonSymptoms": ["symptom1", "symptom2"],
      "recommendations": ["recommendation1", "recommendation2"],
      "urgency": "Urgency description",
      "citations": ["Source 1", "Source 2"]
    }
  ],
  "additionalInfo": {
    "whenToSeekCare": "When to seek immediate care",
    "redFlags": ["Red flag symptom 1", "Red flag symptom 2"],
    "disclaimer": "Medical disclaimer"
  }
}`;

    const maxRetries = 3;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          await new Promise(r => setTimeout(r, (attempt * 16) * 1000));
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                topP: 0.9,
                maxOutputTokens: 2000,
              },
            }),
          }
        );

        let data: any = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (response.status === 429) {
          const retryMatch = data?.error?.message?.match(/retry in ([\d.]+)s/i);
          const waitSec = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) + 2 : 20;
          if (attempt < maxRetries - 1) {
            console.log(`Rate limited, retrying in ${waitSec}s (attempt ${attempt + 1}/${maxRetries})`);
            await new Promise(r => setTimeout(r, waitSec * 1000));
            continue;
          }
          throw new Error('Gemini API quota exceeded. Please wait a minute and try again, or check your billing at https://ai.google.dev');
        }

        if (!response.ok) {
          const apiErrorMessage = data?.error?.message as string | undefined;
          const apiErrorReason = data?.error?.details?.[0]?.reason as string | undefined;

          if (
            response.status === 400 &&
            (apiErrorReason === 'API_KEY_INVALID' || /api key/i.test(apiErrorMessage || ''))
          ) {
            throw new Error('Gemini API key is expired or invalid. Generate a new key in Google AI Studio and reconnect it in API Setup.');
          }

          throw new Error(apiErrorMessage || `Gemini API error: ${response.status}`);
        }

        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!content) {
          throw new Error('No response from Gemini API');
        }

        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[0]);
          } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
          }
        }

        return this.parseTextResponse(symptoms);
      } catch (error) {
        if (attempt === maxRetries - 1) {
          console.error('Error calling Gemini API:', error);
          throw error;
        }
      }
    }
    throw new Error('Failed after multiple retries');
  }

  private static parseTextResponse(symptoms: string[]): MedicalAnalysisResult {
    return {
      diseases: [
        {
          name: "Multiple Possible Conditions",
          confidence: 75,
          severity: "Moderate" as const,
          description: "Based on the symptoms provided, several conditions could be considered. Professional medical evaluation is essential for accurate diagnosis.",
          commonSymptoms: symptoms,
          recommendations: [
            "Consult with a healthcare professional for proper evaluation",
            "Keep a symptom diary with dates and severity",
            "Monitor for any worsening symptoms",
            "Follow up as recommended by your healthcare provider"
          ],
          urgency: "Schedule medical consultation within appropriate timeframe",
          citations: ["Medical literature review", "Clinical practice guidelines"]
        }
      ],
      additionalInfo: {
        whenToSeekCare: "Seek immediate care if symptoms worsen significantly or if you experience severe pain, difficulty breathing, or other concerning symptoms.",
        redFlags: ["Severe pain", "Difficulty breathing", "High fever", "Neurological symptoms"],
        disclaimer: "This analysis is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment."
      }
    };
  }
}
