
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, Stethoscope, Hospital } from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  category: "neurological" | "cardiovascular" | "respiratory" | "gastrointestinal" | "musculoskeletal" | "dermatological";
  weight: number;
}

interface Syndrome {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: "low" | "medium" | "high";
  specialistRecommended: string;
}

const symptoms: Symptom[] = [
  // Neurological
  { id: "headache", name: "Persistent headaches", category: "neurological", weight: 2 },
  { id: "dizziness", name: "Dizziness or vertigo", category: "neurological", weight: 2 },
  { id: "memory", name: "Memory problems", category: "neurological", weight: 3 },
  { id: "seizures", name: "Seizures or convulsions", category: "neurological", weight: 4 },
  { id: "numbness", name: "Numbness or tingling", category: "neurological", weight: 2 },
  
  // Cardiovascular
  { id: "chest_pain", name: "Chest pain or pressure", category: "cardiovascular", weight: 4 },
  { id: "palpitations", name: "Heart palpitations", category: "cardiovascular", weight: 3 },
  { id: "swelling", name: "Swelling in legs or ankles", category: "cardiovascular", weight: 3 },
  { id: "fainting", name: "Fainting or near-fainting", category: "cardiovascular", weight: 3 },
  
  // Respiratory
  { id: "shortness_breath", name: "Shortness of breath", category: "respiratory", weight: 3 },
  { id: "chronic_cough", name: "Chronic cough", category: "respiratory", weight: 2 },
  { id: "wheezing", name: "Wheezing", category: "respiratory", weight: 2 },
  
  // Gastrointestinal
  { id: "nausea", name: "Persistent nausea", category: "gastrointestinal", weight: 2 },
  { id: "abdominal_pain", name: "Abdominal pain", category: "gastrointestinal", weight: 2 },
  { id: "diarrhea", name: "Chronic diarrhea", category: "gastrointestinal", weight: 2 },
  { id: "constipation", name: "Chronic constipation", category: "gastrointestinal", weight: 1 },
  
  // Musculoskeletal
  { id: "joint_pain", name: "Joint pain and stiffness", category: "musculoskeletal", weight: 2 },
  { id: "muscle_weakness", name: "Muscle weakness", category: "musculoskeletal", weight: 3 },
  { id: "bone_pain", name: "Bone pain", category: "musculoskeletal", weight: 2 },
  
  // Dermatological
  { id: "rash", name: "Persistent rash", category: "dermatological", weight: 2 },
  { id: "skin_changes", name: "Changes in skin color/texture", category: "dermatological", weight: 2 }
];

const syndromes: Syndrome[] = [
  {
    id: "metabolic",
    name: "Metabolic Syndrome",
    description: "A cluster of conditions that increase risk of heart disease, stroke, and diabetes",
    symptoms: ["chest_pain", "swelling", "shortness_breath", "fatigue"],
    severity: "medium",
    specialistRecommended: "Endocrinologist or Cardiologist"
  },
  {
    id: "fibromyalgia",
    name: "Fibromyalgia Syndrome",
    description: "A chronic condition characterized by widespread musculoskeletal pain",
    symptoms: ["joint_pain", "muscle_weakness", "headache", "memory"],
    severity: "medium",
    specialistRecommended: "Rheumatologist"
  },
  {
    id: "chronic_fatigue",
    name: "Chronic Fatigue Syndrome",
    description: "Extreme fatigue that doesn't improve with rest and worsens with activity",
    symptoms: ["memory", "headache", "joint_pain", "muscle_weakness"],
    severity: "medium",
    specialistRecommended: "Internal Medicine Specialist"
  },
  {
    id: "ibs",
    name: "Irritable Bowel Syndrome",
    description: "A functional gastrointestinal disorder affecting the large intestine",
    symptoms: ["abdominal_pain", "diarrhea", "constipation", "nausea"],
    severity: "low",
    specialistRecommended: "Gastroenterologist"
  },
  {
    id: "migraine",
    name: "Migraine Syndrome",
    description: "A neurological condition characterized by recurring headaches",
    symptoms: ["headache", "dizziness", "nausea"],
    severity: "medium",
    specialistRecommended: "Neurologist"
  }
];

const SyndromeChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    }
  };

  const calculateMatches = () => {
    const matches = syndromes.map(syndrome => {
      const matchingSymptoms = syndrome.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      );
      const matchPercentage = (matchingSymptoms.length / syndrome.symptoms.length) * 100;
      
      return {
        syndrome,
        matchingSymptoms,
        matchPercentage,
        totalWeight: matchingSymptoms.reduce((sum, symptomId) => {
          const symptom = symptoms.find(s => s.id === symptomId);
          return sum + (symptom?.weight || 0);
        }, 0)
      };
    }).filter(match => match.matchPercentage > 0)
     .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return matches;
  };

  const assessSymptoms = () => {
    setShowResults(true);
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
  };

  const groupedSymptoms = symptoms.reduce((groups, symptom) => {
    const category = symptom.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(symptom);
    return groups;
  }, {} as Record<string, Symptom[]>);

  const categoryColors = {
    neurological: "bg-purple-500",
    cardiovascular: "bg-red-500",
    respiratory: "bg-blue-500",
    gastrointestinal: "bg-green-500",
    musculoskeletal: "bg-orange-500",
    dermatological: "bg-pink-500"
  };

  const matches = showResults ? calculateMatches() : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <div>
              <CardTitle>Syndrome Checker</CardTitle>
              <CardDescription>
                Select your symptoms to identify potential medical syndromes. This tool helps provide initial guidance for medical consultation.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-6">
              <div className="space-y-6">
                {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${categoryColors[category as keyof typeof categoryColors]}`}></div>
                      <h4 className="font-semibold capitalize text-gray-900">{category} Symptoms</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categorySymptoms.map((symptom) => (
                        <div key={symptom.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                          <Checkbox
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                          />
                          <label htmlFor={symptom.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{symptom.name}</span>
                              <Badge variant="outline" className="text-xs">
                                Weight: {symptom.weight}
                              </Badge>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={assessSymptoms} 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={selectedSymptoms.length === 0}
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Analyze Symptoms
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Selected Symptoms ({selectedSymptoms.length}):</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptomId => {
                    const symptom = symptoms.find(s => s.id === symptomId);
                    return (
                      <Badge key={symptomId} variant="secondary" className="text-xs">
                        {symptom?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {matches.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-semibold">Potential Syndrome Matches:</h4>
                  {matches.map((match, index) => (
                    <Card key={match.syndrome.id} className={`border-l-4 ${
                      match.matchPercentage >= 75 ? 'border-l-red-500' :
                      match.matchPercentage >= 50 ? 'border-l-orange-500' :
                      'border-l-yellow-500'
                    }`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{match.syndrome.name}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              match.syndrome.severity === 'high' ? 'destructive' :
                              match.syndrome.severity === 'medium' ? 'default' : 'secondary'
                            }>
                              {match.syndrome.severity} priority
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>{match.syndrome.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Symptom Match</span>
                              <span>{Math.round(match.matchPercentage)}%</span>
                            </div>
                            <Progress value={match.matchPercentage} className="h-2" />
                          </div>
                          
                          <div className="text-sm">
                            <strong>Matching symptoms:</strong> {match.matchingSymptoms.length} of {match.syndrome.symptoms.length}
                          </div>
                          
                          <div className="text-sm">
                            <strong>Recommended specialist:</strong> {match.syndrome.specialistRecommended}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No specific syndrome patterns detected with your current symptoms. 
                    Consider consulting with a general practitioner for further evaluation.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-center space-x-4">
                <Button onClick={resetChecker} variant="outline">
                  Check Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert className="border-amber-200 bg-amber-50">
        <Hospital className="h-4 w-4" />
        <AlertDescription className="text-amber-800">
          <strong>Medical Disclaimer:</strong> This syndrome checker is for informational purposes only and should not replace professional medical diagnosis. 
          Always consult with qualified healthcare professionals for proper medical evaluation and treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SyndromeChecker;
