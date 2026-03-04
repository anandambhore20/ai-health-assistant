
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, CheckCircle, AlertTriangle, Info } from "lucide-react";

const WHOGuidelines = () => {
  const guidelines = [
    {
      category: "Prevention",
      icon: Shield,
      color: "bg-green-500",
      items: [
        "Wash hands frequently with soap and water for at least 20 seconds",
        "Use alcohol-based hand sanitizer when soap is not available",
        "Maintain physical distance of at least 1 meter from others",
        "Wear a well-fitted mask when physical distancing is not possible",
        "Avoid touching eyes, nose, and mouth with unwashed hands"
      ]
    },
    {
      category: "Symptoms to Watch",
      icon: AlertTriangle,
      color: "bg-orange-500",
      items: [
        "Fever or chills",
        "Cough (usually dry)",
        "Shortness of breath or difficulty breathing",
        "Fatigue and body aches",
        "Loss of taste or smell"
      ]
    },
    {
      category: "When to Seek Care",
      icon: Info,
      color: "bg-red-500",
      items: [
        "Difficulty breathing or shortness of breath",
        "Persistent chest pain or pressure",
        "Confusion or inability to stay awake",
        "Bluish lips or face",
        "Severe or persistent fever"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100/80 rounded-full mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">WHO Guidelines 2024</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Official World Health Organization guidelines for COVID-19 prevention, symptoms recognition, and healthcare recommendations.
        </p>
        <Badge variant="outline" className="mt-4 bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-4 h-4 mr-2" />
          Updated December 2024
        </Badge>
      </div>

      <Alert className="border-blue-200 bg-blue-50 mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-blue-800">
          These guidelines are based on current scientific evidence and WHO recommendations. 
          Always consult with healthcare professionals for personalized medical advice.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {guidelines.map((guideline, index) => {
          const Icon = guideline.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 ${guideline.color} rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{guideline.category}</CardTitle>
                    <CardDescription>Essential {guideline.category.toLowerCase()} measures</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-amber-800">
          <strong>Emergency:</strong> If you experience severe symptoms, call your local emergency services immediately. 
          Do not delay seeking medical care for life-threatening symptoms.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default WHOGuidelines;
