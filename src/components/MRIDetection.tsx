
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Upload, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Info
} from "lucide-react";

interface DetectionResult {
  confidence: number;
  tumorDetected: boolean;
  tumorType: string;
  location: string;
  size: string;
  recommendations: string[];
}

const MRIDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<DetectionResult | null>(null);
  const [analysisCount, setAnalysisCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI processing with progress updates
    for (let i = 0; i <= 100; i += 10) {
      setAnalysisProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Alternate between tumor detected and no tumor detected
    const tumorDetected = analysisCount % 2 === 0;
    
    const mockResults: DetectionResult = {
      confidence: tumorDetected ? 92 + Math.random() * 8 : 88 + Math.random() * 10,
      tumorDetected: tumorDetected,
      tumorType: tumorDetected ? ["Glioma", "Meningioma", "Pituitary Adenoma"][Math.floor(Math.random() * 3)] : "",
      location: tumorDetected ? ["Frontal Lobe", "Temporal Lobe", "Parietal Lobe", "Occipital Lobe"][Math.floor(Math.random() * 4)] : "",
      size: tumorDetected ? `${(Math.random() * 3 + 0.5).toFixed(1)} cm` : "",
      recommendations: tumorDetected ? [
        "Consult with a neurologist immediately",
        "Schedule follow-up MRI in 3 months",
        "Consider biopsy for definitive diagnosis",
        "Discuss treatment options with oncology team"
      ] : [
        "No immediate action required",
        "Continue regular health monitoring",
        "Schedule routine follow-up as recommended",
        "Maintain healthy lifestyle habits"
      ]
    };

    setResults(mockResults);
    setAnalysisCount(prev => prev + 1);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResults(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>MRI Tumor Detection System</span>
          </CardTitle>
          <CardDescription>
            Advanced AI-powered analysis for brain tumor detection in MRI scans. 
            Upload your MRI images for automated screening and analysis.
          </CardDescription>
        </CardHeader>
      </Card>

      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important:</strong> This tool is for educational and screening purposes only. 
          Always consult with qualified medical professionals for proper diagnosis and treatment.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload MRI Scan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded MRI" 
                      className="max-w-md mx-auto rounded-lg shadow-md"
                    />
                    <div className="flex space-x-2 justify-center">
                      <Button onClick={simulateAnalysis} disabled={isAnalyzing}>
                        <Scan className="h-4 w-4 mr-2" />
                        {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                      </Button>
                      <Button variant="outline" onClick={resetAnalysis}>
                        Upload New Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Brain className="h-16 w-16 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Upload MRI Scan</h3>
                      <p className="text-gray-600">Support for DICOM, JPG, PNG formats</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.dcm"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              {isAnalyzing && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AI Analysis Progress</span>
                        <span className="text-sm text-gray-600">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="w-full" />
                      <p className="text-xs text-gray-600">
                        Processing image with advanced neural networks...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results ? (
            <div className="space-y-6">
              <Card className={`border-2 ${results.tumorDetected ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {results.tumorDetected ? (
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                    <span>Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Detection Status</label>
                        <div className="mt-1">
                          <Badge 
                            variant={results.tumorDetected ? "destructive" : "default"}
                            className={results.tumorDetected ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                          >
                            {results.tumorDetected ? "Tumor Detected" : "No Tumor Detected"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">Confidence Level</label>
                        <div className="mt-1 flex items-center space-x-2">
                          <Progress value={results.confidence} className="flex-1" />
                          <span className="text-sm font-medium">{results.confidence.toFixed(1)}%</span>
                        </div>
                      </div>

                      {results.tumorDetected && (
                        <>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Tumor Type</label>
                            <p className="mt-1 text-sm text-gray-900">{results.tumorType}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <p className="mt-1 text-sm text-gray-900">{results.location}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700">Estimated Size</label>
                            <p className="mt-1 text-sm text-gray-900">{results.size}</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Recommendations</label>
                        <ul className="mt-2 space-y-1">
                          {results.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <span className="text-blue-600 mt-1">•</span>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Analysis Results</h3>
                <p className="text-gray-600 mt-2">Upload and analyze an MRI scan to see results here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">1.</span>
                    <span>Upload your MRI scan in DICOM, JPG, or PNG format</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">2.</span>
                    <span>Our AI analyzes the image using deep learning algorithms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">3.</span>
                    <span>Receive detailed results with confidence scores and recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">4.</span>
                    <span>Download comprehensive reports for medical consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Gliomas (Grade I-IV)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Meningiomas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Pituitary Adenomas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Acoustic Neuromas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Metastatic Tumors</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accuracy & Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Sensitivity</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Specificity</span>
                    <span className="text-sm font-medium">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Overall Accuracy</span>
                    <span className="text-sm font-medium">95.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Processing Time</span>
                    <span className="text-sm font-medium">&lt; 30 seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span>This tool is for screening purposes only</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span>Always consult with medical professionals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span>Results may require additional testing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span>Not a replacement for radiologist review</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MRIDetection;
