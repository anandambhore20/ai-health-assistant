
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Syringe, Bandage, TestTube } from "lucide-react";

const PreventionGuide = () => {
  const preventionMeasures = [
    {
      title: "Vaccination",
      description: "Get vaccinated and stay up to date with COVID-19 vaccines",
      effectiveness: 95,
      icon: Syringe,
      color: "green",
      tips: [
        "Complete your primary vaccination series",
        "Get recommended booster shots",
        "Consult with healthcare provider about timing",
        "Keep vaccination records updated"
      ]
    },
    {
      title: "Mask Wearing",
      description: "Wear masks in crowded or high-risk environments",
      effectiveness: 80,
      icon: Bandage,
      color: "blue",
      tips: [
        "Use well-fitting masks that cover nose and mouth",
        "N95 or KN95 masks offer better protection",
        "Wear masks in indoor public spaces",
        "Replace masks when they become dirty or damaged"
      ]
    },
    {
      title: "Hand Hygiene",
      description: "Regular handwashing and sanitizing",
      effectiveness: 75,
      icon: TestTube,
      color: "purple",
      tips: [
        "Wash hands for at least 20 seconds with soap",
        "Use hand sanitizer with at least 60% alcohol",
        "Avoid touching face with unwashed hands",
        "Clean hands before eating or touching face"
      ]
    }
  ];

  const socialDistancing = {
    title: "Social Distancing",
    description: "Maintain physical distance from others",
    effectiveness: 70,
    tips: [
      "Stay at least 6 feet away from others",
      "Avoid crowded indoor spaces",
      "Choose outdoor activities when possible",
      "Limit close contact with people outside your household"
    ]
  };

  const environmentalMeasures = [
    {
      title: "Improve Ventilation",
      items: [
        "Open windows and doors when possible",
        "Use air purifiers with HEPA filters",
        "Avoid poorly ventilated spaces",
        "Choose outdoor dining over indoor"
      ]
    },
    {
      title: "Surface Cleaning",
      items: [
        "Clean frequently touched surfaces daily",
        "Use EPA-approved disinfectants",
        "Pay attention to doorknobs, light switches, phones",
        "Don't forget to clean personal items like keys and wallet"
      ]
    },
    {
      title: "Travel Safety",
      items: [
        "Check travel advisories before trips",
        "Follow destination health requirements",
        "Consider postponing non-essential travel",
        "Pack extra masks and hand sanitizer"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>COVID-19 Prevention Guidelines</CardTitle>
          <CardDescription>
            Evidence-based strategies to reduce your risk of COVID-19 infection. 
            Multiple layers of protection work best together.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Primary Prevention Measures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {preventionMeasures.map((measure, index) => {
          const IconComponent = measure.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2 bg-${measure.color}-100 rounded-lg`}>
                    <IconComponent className={`h-6 w-6 text-${measure.color}-600`} />
                  </div>
                  <Badge variant="outline" className={`bg-${measure.color}-50 text-${measure.color}-700 border-${measure.color}-200`}>
                    {measure.effectiveness}% effective
                  </Badge>
                </div>
                <CardTitle className="text-lg">{measure.title}</CardTitle>
                <CardDescription>{measure.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Effectiveness</span>
                    <span>{measure.effectiveness}%</span>
                  </div>
                  <Progress value={measure.effectiveness} className="h-2" />
                </div>
                <ul className="space-y-2">
                  {measure.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                      <span className={`text-${measure.color}-600 mt-1`}>•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Social Distancing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {socialDistancing.title}
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              {socialDistancing.effectiveness}% effective
            </Badge>
          </CardTitle>
          <CardDescription>{socialDistancing.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Effectiveness</span>
              <span>{socialDistancing.effectiveness}%</span>
            </div>
            <Progress value={socialDistancing.effectiveness} className="h-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialDistancing.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <span className="text-indigo-600 mt-1">•</span>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Measures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {environmentalMeasures.map((measure, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{measure.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {measure.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                    <span className="text-gray-600 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Remember: Layer Your Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            No single prevention measure is 100% effective. The best protection comes from combining multiple strategies:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Syringe className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium">Vaccination</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Bandage className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium">Masking</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TestTube className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium">Hand Hygiene</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-lg">6ft</span>
              </div>
              <span className="text-blue-900 font-medium">Distance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreventionGuide;
