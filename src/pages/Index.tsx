
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Thermometer, 
  Hospital, 
  Pill, 
  Microscope, 
  TestTube, 
  Syringe,
  Bandage,
  Eye,
  Stethoscope,
  Shield,
  Heart,
  Activity,
  Menu,
  User,
  Brain,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const { user, logout } = useAuth();

  const quickAccessCards = [
    {
      title: "Disease Detector",
      description: "AI-Powered Instant Analysis",
      icon: Stethoscope,
      bgGradient: "from-teal-50 to-teal-100",
      borderColor: "border-teal-200",
      iconBg: "bg-teal-500",
      textColor: "text-teal-600",
      route: "/disease-detector"
    },
    {
      title: "MRI Analysis",
      description: "Advanced Deep Learning",
      icon: Microscope,
      bgGradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600",
      route: "/mri-analysis"
    },
    {
      title: "Emergency Help",
      description: "Instant Access",
      icon: Hospital,
      bgGradient: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      iconBg: "bg-red-500",
      textColor: "text-red-600",
      route: "/emergency"
    },
    {
      title: "Syndrome Checker",
      description: "AI Pattern Analysis",
      icon: Brain,
      bgGradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600",
      route: "/syndrome-checker"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-4 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-4 md:right-20 w-32 h-32 md:w-48 md:h-48 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-28 md:w-40 md:h-40 bg-indigo-200 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-blue-100/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg md:rounded-xl shadow-lg">
                <Microscope className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HealthScanner
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Comprehensive AI Medical Analysis & Disease Detection
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HealthScanner
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-xs md:text-sm px-3 md:px-4 py-2"
                      size="sm"
                    >
                      <Hospital className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    className="text-xs md:text-sm px-3 md:px-4 py-2"
                    size="sm"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xs md:text-sm px-3 md:px-4 py-2"
                      size="sm"
                    >
                      <User className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button 
                      variant="outline"
                      className="text-xs md:text-sm px-3 md:px-4 py-2 hidden sm:flex"
                      size="sm"
                    >
                      <Hospital className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                </>
              )}
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 md:px-3 py-1 font-semibold text-xs">
                <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                <span className="hidden sm:inline">Evidence-Based</span>
                <span className="sm:hidden">AI</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100/80 rounded-full mb-4 md:mb-6">
            <Heart className="h-4 w-4 md:h-6 md:w-6 text-blue-600 mr-2" />
            <span className="text-blue-700 font-semibold text-xs md:text-sm">Trusted by Healthcare Professionals</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2">
            Your Comprehensive 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Medical </span>
            Assistant
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Advanced AI-powered health screening including disease detection, MRI analysis, prevention guidance, and treatment information from trusted medical sources.
          </p>
          <div className="mt-6 md:mt-8 flex justify-center">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                24/7 Available
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                AI-Powered Analysis
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Evidence-Based
              </div>
            </div>
          </div>
          
          {!user && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link to="/auth">
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
                  size="lg"
                >
                  <User className="w-5 h-5 mr-2" />
                  Get Started Today
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 px-8 py-3"
                  size="lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Access Cards */}
        <div className="mb-8 md:mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Quick Access to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Tools</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on any feature below to access our comprehensive AI-powered medical analysis tools
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {quickAccessCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link key={index} to={card.route}>
                  <Card className={`text-center bg-gradient-to-br ${card.bgGradient} ${card.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-2 hover:border-opacity-60`}>
                    <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
                      <div className={`p-3 md:p-4 ${card.iconBg} rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="h-5 w-5 md:h-7 md:w-7 text-white" />
                      </div>
                      <CardTitle className="text-sm md:text-base font-bold text-gray-800 leading-tight">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 md:p-6 pt-0">
                      <p className={`text-xs md:text-sm font-semibold ${card.textColor} mb-2`}>{card.description}</p>
                      <div className="flex items-center justify-center text-gray-500 group-hover:text-gray-700 transition-colors">
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                        <span className="text-xs">Open Tool</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">AI Disease Detection</CardTitle>
                  <CardDescription className="text-gray-600">Advanced pattern recognition</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our AI analyzes medical images and symptoms to provide accurate disease detection with high precision rates.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">95% Accuracy</Badge>
                <Link to="/disease-detector">
                  <Button variant="outline" size="sm">Try Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">Eye Disease Detection</CardTitle>
                  <CardDescription className="text-gray-600">AI retinal analysis</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Upload retinal images for AI-powered detection of glaucoma, diabetic retinopathy, cataracts, and more.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-green-100 text-green-700">Deep Learning</Badge>
                <Link to="/eye-detection">
                  <Button variant="outline" size="sm">Scan Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Hospital className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">24/7 Emergency</CardTitle>
                  <CardDescription className="text-gray-600">Immediate assistance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Access emergency contacts and immediate medical assistance whenever you need it.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="animate-pulse">Emergency Ready</Badge>
                <Link to="/emergency">
                  <Button variant="outline" size="sm">Emergency</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg rounded-xl backdrop-blur-sm">
          <div className="p-2 bg-amber-100 rounded-lg w-fit">
            <Pill className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
          </div>
          <AlertDescription className="text-amber-800 font-medium ml-4 text-sm md:text-base">
            <strong className="text-amber-900">Medical Disclaimer:</strong> These tools provide general health information and AI-assisted screening only. 
            Always consult with healthcare professionals for proper medical diagnosis and treatment. 
            In case of emergency, call your local emergency services immediately.
          </AlertDescription>
        </Alert>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-blue-100/50 dark:border-gray-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Created & Developed by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Anand Manoj Ambhore</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>📞 +91 9673610351</span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:anandambhore5604@gmail.com" className="hover:text-blue-600 transition-colors">
              ✉️ anandambhore5604@gmail.com
            </a>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            © {new Date().getFullYear()} HealthScanner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
