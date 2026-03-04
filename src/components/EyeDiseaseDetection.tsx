
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Camera,
  FileImage,
  Zap
} from "lucide-react";

interface DetectionResult {
  condition: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High";
  description: string;
  recommendations: string[];
  color: string;
}

const EyeDiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<DetectionResult[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResults([]);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const simulateAnalysis = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Simulate different detection results
    const mockResults: DetectionResult[] = [
      {
        condition: "Diabetic Retinopathy",
        confidence: 92,
        severity: "Moderate",
        description: "Early signs of diabetic retinopathy detected with characteristic microaneurysms and small hemorrhages.",
        recommendations: [
          "Schedule immediate consultation with an ophthalmologist",
          "Monitor blood sugar levels closely",
          "Consider laser treatment if recommended by specialist",
          "Regular follow-up examinations every 3-6 months"
        ],
        color: "orange"
      },
      {
        condition: "Macular Degeneration Risk",
        confidence: 78,
        severity: "Low",
        description: "Mild drusen deposits detected, indicating early risk factors for age-related macular degeneration.",
        recommendations: [
          "Annual comprehensive eye examinations",
          "Maintain healthy diet rich in antioxidants",
          "Consider AREDS2 vitamin supplements",
          "Monitor vision changes with Amsler grid"
        ],
        color: "yellow"
      },
      {
        condition: "Normal Retina",
        confidence: 85,
        severity: "Low",
        description: "No significant abnormalities detected. Retinal structure appears healthy.",
        recommendations: [
          "Continue regular eye check-ups",
          "Maintain healthy lifestyle",
          "Protect eyes from UV exposure",
          "Report any sudden vision changes"
        ],
        color: "green"
      }
    ];
    
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Moderate": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getResultIcon = (condition: string) => {
    if (condition === "Normal Retina") return <CheckCircle className="h-5 w-5 text-green-600" />;
    return <AlertTriangle className="h-5 w-5 text-orange-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-900">AI Eye Disease Detection</CardTitle>
              <CardDescription className="text-lg">
                Advanced retinal analysis for early disease detection using AI-powered image recognition
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <span>Upload Retinal Image</span>
          </CardTitle>
          <CardDescription>
            Upload a fundus photograph or OCT scan for AI-powered analysis. Supports JPG, PNG, and DICOM formats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileImage className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <Label htmlFor="eye-image" className="cursor-pointer">
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    Choose retinal image file
                  </div>
                  <div className="text-sm text-gray-600">
                    Drag and drop or click to select • Max file size: 10MB
                  </div>
                </Label>
                <Input
                  id="eye-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">{selectedFile.name}</p>
                    <p className="text-sm text-blue-700">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={simulateAnalysis}
                  disabled={isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-700">Image Preview</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Retinal scan preview" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600 animate-pulse" />
              <span>AI Analysis in Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-sm text-gray-600 text-center">
                Processing retinal features and detecting potential abnormalities... {analysisProgress}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-green-600" />
                <span>Analysis Results</span>
              </CardTitle>
              <CardDescription>
                AI-powered detection results with confidence scores and recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          {results.map((result, index) => (
            <Card key={index} className="border-l-4" style={{borderLeftColor: result.color === 'green' ? '#10b981' : result.color === 'orange' ? '#f59e0b' : '#ef4444'}}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getResultIcon(result.condition)}
                    <div>
                      <CardTitle className="text-lg">{result.condition}</CardTitle>
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
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{result.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, recIndex) => (
                      <li key={recIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Progress value={result.confidence} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Important Notice */}
      <Alert className="border-amber-200 bg-amber-50">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Medical Disclaimer:</strong> This AI analysis is for screening purposes only and should not replace professional medical diagnosis. 
          Always consult with a qualified ophthalmologist for proper evaluation and treatment of eye conditions.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EyeDiseaseDetection;
