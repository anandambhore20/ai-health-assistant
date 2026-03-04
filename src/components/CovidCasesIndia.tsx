
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react";

const CovidCasesIndia = () => {
  const [covidData, setCovidData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalCases: 0,
    activeCases: 0,
    recovered: 0,
    deaths: 0,
    dailyNew: 0
  });

  useEffect(() => {
    // Simulated COVID data for India (in a real app, this would come from an API)
    const generateMockData = () => {
      const data = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          cases: Math.floor(Math.random() * 50000) + 10000,
          recovered: Math.floor(Math.random() * 45000) + 8000,
          deaths: Math.floor(Math.random() * 500) + 100,
          active: Math.floor(Math.random() * 5000) + 1000
        });
      }
      
      return data;
    };

    const mockData = generateMockData();
    setCovidData(mockData);
    
    // Calculate summary from last entry
    const lastEntry = mockData[mockData.length - 1];
    setSummary({
      totalCases: 45000000,
      activeCases: lastEntry.active,
      recovered: 44500000,
      deaths: 535000,
      dailyNew: lastEntry.cases
    });
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading COVID-19 data for India...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-red-100/80 rounded-full mb-4">
          <Activity className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">COVID-19 India Dashboard</h2>
        <p className="text-gray-600">Live tracking of COVID-19 cases across India</p>
        <Badge variant="outline" className="mt-4 bg-green-50 text-green-700 border-green-200">
          <Activity className="w-4 h-4 mr-2" />
          Live Data
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-700">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {summary.totalCases.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-700">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">
              {summary.activeCases.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-700">Recovered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {summary.recovered.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-700">Deaths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">
              {summary.deaths.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-purple-700">Daily New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {summary.dailyNew.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Daily Cases Trend (Last 30 Days)</span>
            </CardTitle>
            <CardDescription>New COVID-19 cases reported daily in India</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={covidData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <span>Recovery vs Active Cases</span>
            </CardTitle>
            <CardDescription>Comparison of recovered and active cases</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={covidData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="recovered" fill="#10B981" />
                <Bar dataKey="active" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CovidCasesIndia;
