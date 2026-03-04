
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Thermometer, TestTube, Hospital } from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  severity: "low" | "medium" | "high";
  points: number;
}

const symptoms: Symptom[] = [
  { id: "fever", name: "Fever (100.4°F/38°C or higher)", severity: "high", points: 3 },
  { id: "cough", name: "New continuous cough", severity: "high", points: 3 },
  { id: "breathing", name: "Difficulty breathing or shortness of breath", severity: "high", points: 4 },
  { id: "fatigue", name: "Unusual tiredness or fatigue", severity: "medium", points: 2 },
  { id: "bodyache", name: "Body aches and muscle pain", severity: "medium", points: 2 },
  { id: "headache", name: "Headache", severity: "medium", points: 1 },
  { id: "sorethroat", name: "Sore throat", severity: "medium", points: 2 },
  { id: "taste", name: "Loss of taste or smell", severity: "high", points: 3 },
  { id: "nausea", name: "Nausea or vomiting", severity: "low", points: 1 },
  { id: "diarrhea", name: "Diarrhea", severity: "low", points: 1 },
  { id: "chills", name: "Chills or shivering", severity: "medium", points: 2 },
  { id: "congestion", name: "Nasal congestion or runny nose", severity: "low", points: 1 }
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    }
  };

  const calculateRisk = () => {
    const totalPoints = selectedSymptoms.reduce((sum, symptomId) => {
      const symptom = symptoms.find(s => s.id === symptomId);
      return sum + (symptom?.points || 0);
    }, 0);

    if (totalPoints >= 8) return { level: "high", color: "red", message: "High risk - Seek immediate medical attention" };
    if (totalPoints >= 4) return { level: "medium", color: "amber", message: "Moderate risk - Contact healthcare provider" };
    if (totalPoints >= 1) return { level: "low", color: "yellow", message: "Low risk - Monitor symptoms and stay home" };
    return { level: "none", color: "green", message: "No significant COVID-19 symptoms detected" };
  };

  const assessSymptoms = () => {
    setShowResults(true);
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
  };

  const risk = calculateRisk();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle>COVID-19 Symptom Checker</CardTitle>
              <CardDescription>
                Select any symptoms you're currently experiencing. This assessment is based on CDC guidelines.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                    />
                    <label htmlFor={symptom.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{symptom.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            symptom.severity === 'high' ? 'border-red-200 text-red-700' :
                            symptom.severity === 'medium' ? 'border-amber-200 text-amber-700' :
                            'border-gray-200 text-gray-700'
                          }`}
                        >
                          {symptom.severity}
                        </Badge>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={assessSymptoms} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={selectedSymptoms.length === 0}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Assess My Symptoms
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Alert className={`border-${risk.color}-200 bg-${risk.color}-50`}>
                <Hospital className={`h-4 w-4 text-${risk.color}-600`} />
                <AlertDescription className={`text-${risk.color}-800`}>
                  <strong>Assessment Result:</strong> {risk.message}
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Selected Symptoms:</h4>
                <div className="space-y-1">
                  {selectedSymptoms.map(symptomId => {
                    const symptom = symptoms.find(s => s.id === symptomId);
                    return (
                      <div key={symptomId} className="text-sm text-gray-700">
                        • {symptom?.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Recommended Actions:</h4>
                {risk.level === "high" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600">•</span>
                      <span>Contact your healthcare provider immediately or call emergency services</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600">•</span>
                      <span>Consider getting tested for COVID-19</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600">•</span>
                      <span>Isolate from others until you can seek medical advice</span>
                    </li>
                  </ul>
                )}
                {risk.level === "medium" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">•</span>
                      <span>Contact your healthcare provider for guidance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">•</span>
                      <span>Consider getting tested for COVID-19</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">•</span>
                      <span>Stay home and monitor symptoms</span>
                    </li>
                  </ul>
                )}
                {risk.level === "low" && (
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600">•</span>
                      <span>Stay home and rest</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600">•</span>
                      <span>Monitor symptoms closely</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600">•</span>
                      <span>Consider testing if symptoms worsen</span>
                    </li>
                  </ul>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={resetChecker} variant="outline">
                  Check Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;
