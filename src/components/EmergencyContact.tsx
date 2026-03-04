
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Hospital, Phone, Ambulance, MapPin, Shield, Heart } from "lucide-react";

const EmergencyContact = () => {
  const emergencyNumbers = [
    {
      country: "India",
      flag: "🇮🇳",
      emergency: "112",
      police: "100",
      fire: "101",
      ambulance: "108",
      poison: "1066",
      crisis: "9152987821"
    },
    {
      country: "United States",
      flag: "🇺🇸",
      emergency: "911",
      poison: "1-800-222-1222",
      crisis: "988"
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      emergency: "999",
      poison: "111",
      crisis: "116 123"
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      emergency: "911",
      poison: "1-844-764-7669",
      crisis: "1-833-456-4566"
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      emergency: "000",
      poison: "13 11 26",
      crisis: "13 11 14"
    }
  ];

  const emergencySymptoms = [
    "Trouble breathing or shortness of breath",
    "Persistent pain or pressure in the chest",
    "New confusion or inability to wake",
    "Bluish lips or face",
    "Severe persistent vomiting",
    "Signs of severe dehydration",
    "High fever with severe headache"
  ];

  const quickActions = [
    {
      title: "Emergency Call",
      description: "Call 112 (India) / 911 (US)",
      icon: Phone,
      color: "bg-red-500 hover:bg-red-600",
      action: () => window.open('tel:112')
    },
    {
      title: "Find Hospital",
      description: "Locate nearest hospital",
      icon: Hospital,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => window.open('https://maps.google.com/search/hospital+near+me', '_blank')
    },
    {
      title: "Crisis Helpline",
      description: "Mental health support",
      icon: Heart,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => window.open('tel:9152987821')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl">
          <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl">
            <Hospital className="h-8 w-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-900">Emergency Medical Resources</h1>
            <p className="text-gray-600">Critical contacts and guidance for medical emergencies</p>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      <Alert className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 border-2">
        <Ambulance className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <div className="font-semibold text-lg mb-3">⚠️ Call Emergency Services Immediately if experiencing:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {emergencySymptoms.map((symptom, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{symptom}</span>
              </div>
            ))}
          </div>
        </AlertDescription>
      </Alert>

      {/* Quick Action Buttons */}
      <Card className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 border-red-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-red-900">
            <Phone className="h-6 w-6" />
            <span>Quick Emergency Actions</span>
          </CardTitle>
          <CardDescription>Immediate access to emergency services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className={`h-20 flex flex-col space-y-2 text-white ${action.color} border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Numbers by Country */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Numbers by Country</h2>
          <p className="text-gray-600">Important emergency contacts worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {emergencyNumbers.map((country, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all duration-200 hover:border-red-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-lg">{country.country}</span>
                  </div>
                  <MapPin className="h-5 w-5 text-gray-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="font-medium text-red-800">Emergency Services:</span>
                  <Badge variant="destructive" className="text-lg font-bold px-3 py-1">
                    {country.emergency}
                  </Badge>
                </div>
                
                {country.police && (
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Police:</span>
                    <Badge variant="outline" className="border-blue-200 text-blue-700 font-semibold">
                      {country.police}
                    </Badge>
                  </div>
                )}
                
                {country.fire && (
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-orange-800">Fire:</span>
                    <Badge variant="outline" className="border-orange-200 text-orange-700 font-semibold">
                      {country.fire}
                    </Badge>
                  </div>
                )}
                
                {country.ambulance && (
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Ambulance:</span>
                    <Badge variant="outline" className="border-green-200 text-green-700 font-semibold">
                      {country.ambulance}
                    </Badge>
                  </div>
                )}
                
                {country.poison && (
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">Poison Control:</span>
                    <Badge variant="outline" className="border-yellow-200 text-yellow-700 font-semibold">
                      {country.poison}
                    </Badge>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">Crisis Helpline:</span>
                  <Badge variant="outline" className="border-purple-200 text-purple-700 font-semibold">
                    {country.crisis}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preparation Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Shield className="h-6 w-6" />
              <span>Emergency Preparedness</span>
            </CardTitle>
            <CardDescription>Be ready before emergencies occur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800 mb-3">Medical Information Ready</h4>
              {[
                "List of current medications",
                "Allergy information",
                "Emergency contact numbers",
                "Insurance information",
                "Medical history summary"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-sm text-green-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Heart className="h-6 w-6" />
              <span>Emergency Kit Essentials</span>
            </CardTitle>
            <CardDescription>Essential supplies for medical emergencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800 mb-3">Keep These Items Ready</h4>
              {[
                "Digital thermometer",
                "Basic medications (fever reducer, pain relief)",
                "Face masks and gloves",
                "Hand sanitizer",
                "First aid supplies"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm text-blue-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Reminders */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <Hospital className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="font-semibold text-lg mb-3">💡 Important Reminders</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Don't hesitate to call for help if you're concerned",
              "Emergency rooms are prepared for all medical emergencies",
              "Wear a mask when seeking medical care",
              "Call ahead when possible to inform about symptoms",
              "Keep emergency numbers saved in your phone",
              "Know the location of your nearest hospital"
            ].map((reminder, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-sm">{reminder}</span>
              </div>
            ))}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EmergencyContact;
