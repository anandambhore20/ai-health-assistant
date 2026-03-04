import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Shield,
  AlertTriangle,
  Zap
} from "lucide-react";
import { GeminiService } from "@/services/GeminiService";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyManagerProps {
  onKeysConfigured: (configured: boolean) => void;
}

const ApiKeyManager = ({ onKeysConfigured }: ApiKeyManagerProps) => {
  const [geminiKey, setGeminiKey] = useState("");
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [isTestingGemini, setIsTestingGemini] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState<'unconfigured' | 'valid' | 'invalid'>('unconfigured');
  const { toast } = useToast();

  useEffect(() => {
    const existingKey = GeminiService.getApiKey();
    if (existingKey) {
      setGeminiStatus('valid');
    }
    onKeysConfigured(!!existingKey);
  }, [onKeysConfigured]);

  const testGeminiKey = async () => {
    if (!geminiKey.trim()) return;
    
    setIsTestingGemini(true);
    try {
      const isValid = await GeminiService.testApiKey(geminiKey);
      if (isValid) {
        GeminiService.saveApiKey(geminiKey);
        setGeminiStatus('valid');
        setGeminiKey('');
        toast({
          title: "Success!",
          description: "Gemini API key saved securely.",
          duration: 3000,
        });
        onKeysConfigured(true);
      } else {
        setGeminiStatus('invalid');
        toast({
          title: "Invalid Key",
          description: "API key seems too short. Please check and try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      setGeminiStatus('invalid');
      toast({
        title: "Error",
        description: "Unable to save API key. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsTestingGemini(false);
    }
  };

  const clearGeminiKey = () => {
    GeminiService.clearApiKey();
    setGeminiStatus('unconfigured');
    onKeysConfigured(false);
    toast({
      title: "Key Removed",
      description: "Gemini API key has been removed.",
      duration: 3000,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'invalid':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Invalid
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Not Configured
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">AI API Configuration</CardTitle>
              <CardDescription className="text-gray-600">
                Configure your Google Gemini API key to enable real-time medical analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Security Note:</strong> Your API key is stored locally in your browser and never sent to our servers. 
          It is only used for direct communication with the Google Gemini API.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span>Google Gemini AI</span>
            {getStatusBadge(geminiStatus)}
          </CardTitle>
          <CardDescription>
            AI service for medical analysis powered by Google Gemini 2.0 Flash.
            Get your API key from{" "}
            <a 
              href="https://aistudio.google.com/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Google AI Studio <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {geminiStatus === 'valid' ? (
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Gemini AI is connected and ready!</span>
              </div>
              <Button variant="outline" onClick={clearGeminiKey} size="sm">
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="gemini-key">API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="gemini-key"
                      type={showGeminiKey ? "text" : "password"}
                      placeholder="AIzaSy..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowGeminiKey(!showGeminiKey)}
                    >
                      {showGeminiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={testGeminiKey}
                    disabled={!geminiKey.trim() || isTestingGemini}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isTestingGemini ? "Saving..." : "Connect"}
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>AI-powered medical analysis</li>
                  <li>Differential diagnosis with citations</li>
                  <li>Evidence-based recommendations</li>
                  <li>Powered by Gemini 2.0 Flash</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyManager;
