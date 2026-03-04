
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Thermometer, Hospital } from "lucide-react";

const TreatmentInfo = () => {
  const homeCareTips = [
    {
      category: "Rest and Recovery",
      icon: "🛏️",
      tips: [
        "Get plenty of sleep (8+ hours per night)",
        "Rest during the day when feeling tired",
        "Avoid strenuous activities",
        "Create a comfortable recovery environment"
      ]
    },
    {
      category: "Hydration",
      icon: "💧",
      tips: [
        "Drink plenty of fluids (water, herbal teas, broths)",
        "Avoid alcohol and caffeine",
        "Aim for clear or pale yellow urine",
        "Use a humidifier to ease breathing"
      ]
    },
    {
      category: "Nutrition",
      icon: "🥗",
      tips: [
        "Eat nutritious, easy-to-digest foods",
        "Include vitamin C and zinc-rich foods",
        "Try warm soups and broths",
        "Don't force eating if nauseous, but stay hydrated"
      ]
    },
    {
      category: "Symptom Management",
      icon: "🌡️",
      tips: [
        "Use over-the-counter fever reducers as directed",
        "Try warm salt water gargles for sore throat",
        "Use saline nasal drops for congestion",
        "Monitor temperature regularly"
      ]
    }
  ];

  const medications = [
    {
      name: "Acetaminophen (Tylenol)",
      purpose: "Fever and pain relief",
      dosage: "Follow package instructions",
      notes: "Generally safe for most people"
    },
    {
      name: "Ibuprofen (Advil, Motrin)",
      purpose: "Fever, pain, and inflammation",
      dosage: "Follow package instructions",
      notes: "Take with food to avoid stomach upset"
    },
    {
      name: "Throat Lozenges",
      purpose: "Sore throat relief",
      dosage: "As needed",
      notes: "Choose sugar-free options if diabetic"
    },
    {
      name: "Cough Suppressants",
      purpose: "Reduce dry cough",
      dosage: "Follow package instructions",
      notes: "Consult pharmacist for recommendations"
    }
  ];

  const warningSignsEmergency = [
    "Trouble breathing or shortness of breath",
    "Persistent pain or pressure in chest",
    "New confusion or inability to arouse",
    "Bluish lips or face",
    "Severe or persistent vomiting",
    "Signs of dehydration"
  ];

  const isolationGuidelines = [
    {
      title: "Duration",
      content: "Isolate for at least 5 days from symptom onset or positive test"
    },
    {
      title: "End Isolation",
      content: "When fever-free for 24 hours without fever-reducing medication"
    },
    {
      title: "Mask Wearing",
      content: "Wear a well-fitting mask for 10 days when around others"
    },
    {
      title: "Household Members",
      content: "Separate from others in your home as much as possible"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-6 w-6 text-purple-600" />
            <span>COVID-19 Treatment & Recovery Guide</span>
          </CardTitle>
          <CardDescription>
            Evidence-based care strategies for managing COVID-19 symptoms at home. 
            Always follow your healthcare provider's specific recommendations.
          </CardDescription>
        </CardHeader>
      </Card>

      <Alert className="border-amber-200 bg-amber-50">
        <Hospital className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Important:</strong> This information is for mild to moderate symptoms only. 
          Seek immediate medical attention if you experience severe symptoms or emergency warning signs.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="home-care" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home-care">Home Care</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="isolation">Isolation</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
        </TabsList>

        <TabsContent value="home-care" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeCareTips.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                        <span className="text-purple-600 mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medications.map((med, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{med.name}</span>
                    <Pill className="h-5 w-5 text-purple-600" />
                  </CardTitle>
                  <CardDescription>{med.purpose}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-sm">Dosage: </span>
                      <span className="text-sm text-gray-700">{med.dosage}</span>
                    </div>
                    <div>
                      <span className="font-medium text-sm">Notes: </span>
                      <span className="text-sm text-gray-700">{med.notes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="border-red-200 bg-red-50">
            <Thermometer className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Emergency Warning Signs - Seek immediate medical care:</strong>
              <ul className="mt-2 space-y-1">
                {warningSignsEmergency.map((sign, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span>•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="isolation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isolationGuidelines.map((guideline, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{guideline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{guideline.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Isolation Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Stay in a separate room and use a separate bathroom if possible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Wear a mask when around others in your home</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Don't share personal household items</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Clean and disinfect frequently touched surfaces daily</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Monitor your symptoms and temperature regularly</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Timeline</CardTitle>
              <CardDescription>What to expect during your recovery process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Days 1-3: Early Symptoms</h4>
                  <p className="text-sm text-gray-600">Fever, fatigue, and respiratory symptoms typically begin</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-700">Days 4-7: Peak Symptoms</h4>
                  <p className="text-sm text-gray-600">Symptoms may worsen before improving</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">Days 8-14: Improvement</h4>
                  <p className="text-sm text-gray-600">Most people begin to feel better</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700">Beyond 2 Weeks</h4>
                  <p className="text-sm text-gray-600">Gradual return to normal activities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return to Normal Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span className="text-sm">Fever-free for 24 hours without medication</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span className="text-sm">Symptoms have improved significantly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span className="text-sm">At least 5 days have passed since symptom onset</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-800">!</Badge>
                  <span className="text-sm">Continue wearing masks around others for 10 days</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreatmentInfo;
