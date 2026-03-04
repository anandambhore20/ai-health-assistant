
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Activity,
  Brain,
  Heart,
  Thermometer,
  Zap,
  ExternalLink,
  Key,
  Globe,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Shield
} from "lucide-react";
import { GeminiService } from "@/services/GeminiService";
import { useToast } from "@/components/ui/use-toast";
import ApiKeyManager from "./ApiKeyManager";
import PatientDemographics, { type PatientData } from "./PatientDemographics";
import ComprehensiveSymptoms, { type SymptomData, defaultSymptomData } from "./ComprehensiveSymptoms";

interface DiseaseResult {
  name: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
  description: string;
  commonSymptoms: string[];
  recommendations: string[];
  urgency: string;
  citations: string[];
  reasoning?: string;
  emergencyFlags?: string[];
}

interface AnalysisResult {
  diseases: DiseaseResult[];
  urgencyLevel: "routine" | "moderate" | "urgent" | "emergency";
  redFlags: string[];
  whenToSeekCare: string;
  pregnancyConsiderations?: string[];
  confidenceNote: string;
}

// Default patient data
const defaultPatientData: PatientData = {
  age: "",
  gender: "",
  pregnancyStatus: "",
  bloodGroup: "",
  weight: "",
  weightUnit: "kg",
  height: "",
  heightUnit: "cm",
  medicalHistory: [],
  medications: "",
  symptomDuration: "",
  bodyTemperature: "",
  temperatureUnit: "C",
  bloodPressureSystolic: "",
  bloodPressureDiastolic: "",
  oxygenSaturation: "",
  heartRate: "",
  respiratoryRate: "",
  bloodSugarLevel: "",
};

const HumanDiseaseDetector = () => {
  const [patientData, setPatientData] = useState<PatientData>(defaultPatientData);
  const [symptomData, setSymptomData] = useState<SymptomData>(defaultSymptomData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<DiseaseResult[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState("configuration");
  const { toast } = useToast();

  const performAnalysis = useCallback(async () => {
    // Check if we have enough data
    const activeSymptoms = getActiveSymptomCount();
    if (activeSymptoms === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom and set its severity above 0.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!patientData.age || !patientData.gender) {
      toast({
        title: "Missing Patient Information",
        description: "Please provide at least age and gender for analysis.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!isApiConfigured) {
      toast({
        title: "API Not Configured",
        description: "Please configure your Gemini API key first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setActiveTab("results");
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 12;
        });
      }, 600);
      
      // Prepare comprehensive symptom summary
      const symptomSummary = prepareSymptomSummary();
      const patientSummary = preparePatientSummary();
      
      // Call Gemini AI for enhanced medical analysis
      const analysisResult = await GeminiService.analyzeMedicalSymptoms(
        [symptomSummary],
        `${patientSummary}\n\nAdditional context: Duration of symptoms: ${patientData.symptomDuration}`,
        patientData.age,
        patientData.gender
      );
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      if (analysisResult && analysisResult.diseases) {
        setResults(analysisResult.diseases);
        
        // Enhanced analysis result with urgency and red flags
        const enhancedResult: AnalysisResult = {
          diseases: analysisResult.diseases,
          urgencyLevel: determineUrgencyLevel(analysisResult.diseases),
          redFlags: identifyRedFlags(),
          whenToSeekCare: analysisResult.additionalInfo?.whenToSeekCare || "Consult with healthcare provider for proper evaluation",
          pregnancyConsiderations: (patientData.gender === 'female' && 
            ['possibly-pregnant', 'confirmed-pregnant', 'unsure'].includes(patientData.pregnancyStatus)) 
            ? generatePregnancyConsiderations() : undefined,
          confidenceNote: "Analysis based on current medical literature and symptom patterns"
        };
        
        setAnalysisResult(enhancedResult);
        
        toast({
          title: "Analysis Complete",
          description: `Found ${analysisResult.diseases.length} potential conditions. Urgency: ${enhancedResult.urgencyLevel}`,
          duration: 5000,
        });
      } else {
        throw new Error('No analysis results received');
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Provide actionable fallback results if API fails
      const errorMessage = error instanceof Error ? error.message : "Unable to complete medical analysis. Please try again.";
      const normalizedError = errorMessage.toLowerCase();

      let issueName = "API Connection Issue";
      let issueDescription = errorMessage;
      let issueRecommendations = [
        "Verify your Gemini API key is valid",
        "Check your internet connection",
        "Consult with a healthcare professional for proper evaluation",
        "Try again in a few moments"
      ];
      let issueUrgency = "Please reconfigure API and retry analysis";

      if (normalizedError.includes("quota") || normalizedError.includes("rate limit") || normalizedError.includes("resource_exhausted")) {
        issueName = "Gemini Quota Exceeded";
        issueDescription = "Your Gemini key is valid, but the project quota/rate limit was exceeded.";
        issueRecommendations = [
          "Wait for the cooldown period and retry",
          "Check usage and billing in Google AI Studio",
          "Use a key/project with available Gemini quota",
          "Consult with a healthcare professional for urgent symptoms"
        ];
        issueUrgency = "Retry after quota resets or update billing/quota settings";
      } else if (normalizedError.includes("expired") || normalizedError.includes("invalid") || normalizedError.includes("api key")) {
        issueName = "Gemini API Key Issue";
        issueDescription = "Your Gemini API key is expired or invalid.";
        issueRecommendations = [
          "Generate a new key from Google AI Studio",
          "Reconnect the new key in API Setup",
          "Ensure Generative Language API access is enabled for the key/project",
          "Consult with a healthcare professional for urgent symptoms"
        ];
        issueUrgency = "Update API key and retry analysis";
      }

      const fallbackResults: DiseaseResult[] = [
        {
          name: issueName,
          confidence: 0,
          severity: "Low",
          description: issueDescription,
          commonSymptoms: [],
          recommendations: issueRecommendations,
          urgency: issueUrgency,
          citations: []
        }
      ];
      
      setResults(fallbackResults);
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [patientData, symptomData, isApiConfigured, toast]);

  const prepareSymptomSummary = () => {
    const symptoms: string[] = [];
    
    // Add symptoms with severity > 0
    if (symptomData.fever.severity > 0) {
      symptoms.push(`Fever (severity: ${symptomData.fever.severity}/10, temperature: ${symptomData.fever.temperature || 'unknown'})`);
    }
    if (symptomData.fatigue.energyLevel > 0) {
      symptoms.push(`Fatigue (energy level: ${10 - symptomData.fatigue.energyLevel}/10, daily impact: ${symptomData.fatigue.dailyImpact}/10)`);
    }
    if (symptomData.headache.severity > 0) {
      const types = symptomData.headache.type.length > 0 ? ` - ${symptomData.headache.type.join(', ')}` : '';
      const locations = symptomData.headache.location.length > 0 ? ` in ${symptomData.headache.location.join(', ')}` : '';
      symptoms.push(`Headache (severity: ${symptomData.headache.severity}/10${types}${locations})`);
    }
    if (symptomData.chestPain.severity > 0) {
      const types = symptomData.chestPain.type.length > 0 ? ` - ${symptomData.chestPain.type.join(', ')}` : '';
      symptoms.push(`Chest pain (severity: ${symptomData.chestPain.severity}/10${types})`);
    }
    if (symptomData.breathlessness.severity > 0) {
      symptoms.push(`Shortness of breath (severity: ${symptomData.breathlessness.severity}/10)`);
    }
    if (symptomData.cough.severity > 0) {
      const sputum = symptomData.cough.sputum.length > 0 ? ` with ${symptomData.cough.sputum.join(', ')} sputum` : '';
      symptoms.push(`Cough (severity: ${symptomData.cough.severity}/10, type: ${symptomData.cough.type}${sputum})`);
    }
    if (symptomData.abdominalPain.severity > 0) {
      const locations = symptomData.abdominalPain.location.length > 0 ? ` in ${symptomData.abdominalPain.location.join(', ')}` : '';
      symptoms.push(`Abdominal pain (severity: ${symptomData.abdominalPain.severity}/10${locations})`);
    }
    if (symptomData.jointPain.severity > 0) {
      const locations = symptomData.jointPain.location.length > 0 ? ` in ${symptomData.jointPain.location.join(', ')}` : '';
      symptoms.push(`Joint pain (severity: ${symptomData.jointPain.severity}/10${locations})`);
    }
    if (symptomData.nausea.severity > 0) {
      symptoms.push(`Nausea (severity: ${symptomData.nausea.severity}/10)`);
    }
    if (symptomData.dizziness.severity > 0) {
      symptoms.push(`Dizziness (severity: ${symptomData.dizziness.severity}/10, type: ${symptomData.dizziness.type})`);
    }
    
    // Add pregnancy symptoms if applicable
    if (patientData.gender === 'female' && ['possibly-pregnant', 'confirmed-pregnant', 'unsure'].includes(patientData.pregnancyStatus)) {
      if (symptomData.pregnancySymptoms.morningSickness > 0) {
        symptoms.push(`Morning sickness (severity: ${symptomData.pregnancySymptoms.morningSickness}/10)`);
      }
      if (symptomData.pregnancySymptoms.frequentUrination > 0) {
        symptoms.push(`Frequent urination (severity: ${symptomData.pregnancySymptoms.frequentUrination}/10)`);
      }
      if (symptomData.pregnancySymptoms.fatigue > 0) {
        symptoms.push(`Pregnancy-related fatigue (severity: ${symptomData.pregnancySymptoms.fatigue}/10)`);
      }
    }
    
    return symptoms.join('; ');
  };

  const preparePatientSummary = () => {
    let summary = `Patient: ${patientData.age} year old ${patientData.gender}`;
    
    if (patientData.pregnancyStatus && patientData.pregnancyStatus !== 'not-pregnant') {
      summary += `, pregnancy status: ${patientData.pregnancyStatus}`;
    }
    
    if (patientData.weight && patientData.height) {
      summary += `, weight: ${patientData.weight}${patientData.weightUnit}, height: ${patientData.height}${patientData.heightUnit}`;
    }
    
    // Vital signs
    const vitals: string[] = [];
    if (patientData.bodyTemperature) vitals.push(`temperature: ${patientData.bodyTemperature}°${patientData.temperatureUnit}`);
    if (patientData.bloodPressureSystolic && patientData.bloodPressureDiastolic) vitals.push(`BP: ${patientData.bloodPressureSystolic}/${patientData.bloodPressureDiastolic} mmHg`);
    if (patientData.oxygenSaturation) vitals.push(`SpO2: ${patientData.oxygenSaturation}%`);
    if (patientData.heartRate) vitals.push(`HR: ${patientData.heartRate} bpm`);
    if (patientData.respiratoryRate) vitals.push(`RR: ${patientData.respiratoryRate} breaths/min`);
    if (patientData.bloodSugarLevel) vitals.push(`blood sugar: ${patientData.bloodSugarLevel} mg/dL`);
    if (vitals.length > 0) summary += `, vitals: ${vitals.join(', ')}`;
    
    if (patientData.medicalHistory.length > 0) {
      summary += `, medical history: ${patientData.medicalHistory.join(', ')}`;
    }
    
    if (patientData.medications.trim()) {
      summary += `, current medications: ${patientData.medications}`;
    }
    
    return summary;
  };

  const getActiveSymptomCount = () => {
    let count = 0;
    if (symptomData.fever.severity > 0) count++;
    if (symptomData.fatigue.energyLevel > 0) count++;
    if (symptomData.nightSweats.severity > 0) count++;
    if (symptomData.headache.severity > 0) count++;
    if (symptomData.dizziness.severity > 0) count++;
    if (symptomData.cognitive.severity > 0) count++;
    if (symptomData.numbness.severity > 0) count++;
    if (symptomData.chestPain.severity > 0) count++;
    if (symptomData.palpitations.severity > 0) count++;
    if (symptomData.breathlessness.severity > 0) count++;
    if (symptomData.swelling.severity > 0) count++;
    if (symptomData.cough.severity > 0) count++;
    if (symptomData.soreThroat.severity > 0) count++;
    if (symptomData.wheezing.severity > 0) count++;
    if (symptomData.runnyNose && symptomData.runnyNose.severity > 0) count++;
    if (symptomData.nausea.severity > 0) count++;
    if (symptomData.abdominalPain.severity > 0) count++;
    if (symptomData.heartburn.severity > 0) count++;
    if (symptomData.jointPain.severity > 0) count++;
    if (symptomData.musclePain.severity > 0) count++;
    if (symptomData.backPain.severity > 0) count++;
    if (symptomData.skinRash && symptomData.skinRash.severity > 0) count++;
    if (symptomData.painfulUrination && symptomData.painfulUrination.severity > 0) count++;
    if (symptomData.visionChanges && symptomData.visionChanges.severity > 0) count++;
    
    // Add pregnancy symptoms count if applicable
    if (patientData.gender === 'female' && ['possibly-pregnant', 'confirmed-pregnant', 'unsure'].includes(patientData.pregnancyStatus)) {
      if (symptomData.pregnancySymptoms.morningSickness > 0) count++;
      if (symptomData.pregnancySymptoms.frequentUrination > 0) count++;
      if (symptomData.pregnancySymptoms.fatigue > 0) count++;
      if (symptomData.pregnancySymptoms.moodChanges > 0) count++;
      if (symptomData.pregnancySymptoms.pelvicPressure > 0) count++;
    }
    
    return count;
  };

  const determineUrgencyLevel = (diseases: DiseaseResult[]): "routine" | "moderate" | "urgent" | "emergency" => {
    const maxSeverity = Math.max(...diseases.map(d => {
      switch (d.severity) {
        case "Critical": return 4;
        case "High": return 3;
        case "Moderate": return 2;
        case "Low": return 1;
        default: return 0;
      }
    }));
    
    if (maxSeverity >= 4) return "emergency";
    if (maxSeverity >= 3) return "urgent";
    if (maxSeverity >= 2) return "moderate";
    return "routine";
  };

  const identifyRedFlags = (): string[] => {
    const flags: string[] = [];
    
    if (symptomData.chestPain.severity >= 7) flags.push("Severe chest pain");
    if (symptomData.breathlessness.severity >= 7) flags.push("Severe difficulty breathing");
    if (symptomData.headache.severity >= 8) flags.push("Severe headache");
    if (symptomData.fever.severity >= 8) flags.push("Very high fever");
    if (symptomData.abdominalPain.severity >= 8) flags.push("Severe abdominal pain");
    if (symptomData.visionChanges && symptomData.visionChanges.severity >= 6) flags.push("Significant vision changes");
    
    // Pregnancy-specific red flags
    if (patientData.gender === 'female' && ['confirmed-pregnant', 'possibly-pregnant'].includes(patientData.pregnancyStatus)) {
      if (symptomData.abdominalPain.severity >= 6) flags.push("Abdominal pain during pregnancy");
      if (symptomData.headache.severity >= 6) flags.push("Severe headache during pregnancy");
    }
    
    return flags;
  };

  const generatePregnancyConsiderations = (): string[] => {
    const considerations: string[] = [
      "Symptom analysis takes pregnancy status into account",
      "Some medications may not be safe during pregnancy",
      "Consult with an obstetrician or healthcare provider familiar with pregnancy care"
    ];
    
    if (symptomData.nausea.severity > 0 || symptomData.pregnancySymptoms.morningSickness > 0) {
      considerations.push("Morning sickness is common in early pregnancy but severe cases may need treatment");
    }
    
    return considerations;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getResultIcon = (severity: string) => {
    switch (severity) {
      case "Critical": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "High": return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case "Moderate": return <Activity className="h-5 w-5 text-yellow-600" />;
      case "Low": return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Stethoscope className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-900 flex items-center space-x-2">
                AI Disease Detector
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Globe className="h-3 w-3 mr-1" />
                  Web-Powered
                </Badge>
              </CardTitle>
              <CardDescription className="text-lg">
                Advanced medical analysis powered by real-time web search and latest medical literature
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuration" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>API Setup</span>
            {!isApiConfigured && <Badge variant="destructive" className="ml-2">Required</Badge>}
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!isApiConfigured} className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Symptom Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="results" disabled={results.length === 0} className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Results</span>
            {results.length > 0 && <Badge className="ml-2">{results.length}</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <ApiKeyManager 
            onKeysConfigured={(configured) => {
              const wasConfigured = isApiConfigured;
              setIsApiConfigured(configured);
              if (configured && !wasConfigured) {
                setActiveTab("analysis");
              }
            }} 
          />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Patient Demographics */}
          <PatientDemographics 
            patientData={patientData}
            onPatientDataChange={setPatientData}
          />

          {/* Comprehensive Symptoms */}
          <ComprehensiveSymptoms
            symptomData={symptomData}
            onSymptomDataChange={setSymptomData}
            patientGender={patientData.gender}
            pregnancyStatus={patientData.pregnancyStatus}
          />

          {/* Analysis Button */}
          {getActiveSymptomCount() > 0 && (
            <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Ready for AI Analysis</h3>
                    <p className="text-green-700">
                      {getActiveSymptomCount()} active symptoms • Patient: {patientData.age || 'Age not set'} year old {patientData.gender || 'Gender not set'}
                    </p>
                  </div>
                  <Button 
                    onClick={performAnalysis}
                    disabled={isAnalyzing || !isApiConfigured}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Zap className="h-5 w-5 mr-2 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Stethoscope className="h-5 w-5 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600 animate-pulse" />
                  <span>AI Medical Analysis in Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={analysisProgress} className="w-full" />
                  <p className="text-sm text-gray-600 text-center">
                    {analysisProgress < 30 && "Connecting to AI medical databases..."}
                    {analysisProgress >= 30 && analysisProgress < 60 && "Searching latest medical literature..."}
                    {analysisProgress >= 60 && analysisProgress < 90 && "Analyzing symptom patterns and generating differential diagnosis..."}
                    {analysisProgress >= 90 && "Finalizing analysis and recommendations..."}
                    {" "}{analysisProgress}%
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="h-5 w-5 text-green-600" />
                    <span>AI Medical Analysis Results</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Globe className="h-3 w-3 mr-1" />
                      Web-Sourced
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Real-time analysis based on latest medical literature and clinical guidelines
                  </CardDescription>
                </CardHeader>
              </Card>

              {results.map((result, index) => (
                <Card key={index} className="border-l-4" style={{borderLeftColor: result.severity === 'Low' ? '#10b981' : result.severity === 'Moderate' ? '#f59e0b' : result.severity === 'High' ? '#ef4444' : '#dc2626'}}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getResultIcon(result.severity)}
                        <div>
                          <CardTitle className="text-lg">{result.name}</CardTitle>
                          <CardDescription>Confidence: {result.confidence}%</CardDescription>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Medical Description</h4>
                      <p className="text-gray-700">{result.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Common Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.commonSymptoms.map((symptom, symIndex) => (
                          <Badge key={symIndex} variant="outline" className="bg-blue-50 text-blue-700">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-amber-800">Urgency Level</p>
                      <p className="text-sm text-amber-700">{result.urgency}</p>
                    </div>

                    {result.citations && result.citations.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Medical Sources
                        </p>
                        <ul className="text-xs text-blue-700 space-y-1">
                          {result.citations.map((citation, citIndex) => (
                            <li key={citIndex}>• {citation}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Progress value={result.confidence} className="w-full" />
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-center">
                <Button 
                  onClick={() => setActiveTab("analysis")}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Analyze New Symptoms
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Important Notice */}
      <Alert className="border-amber-200 bg-amber-50">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Medical Disclaimer:</strong> This AI disease detector uses real-time web search for the latest medical information, but is for educational and screening purposes only. 
          Always consult with qualified healthcare providers for proper evaluation, diagnosis, and treatment of any health concerns.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default HumanDiseaseDetector;
