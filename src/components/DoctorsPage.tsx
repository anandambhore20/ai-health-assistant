
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Search,
  Filter,
  Clock,
  Award,
  Users
} from "lucide-react";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 124,
      experience: "15 years",
      location: "Main Hospital",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@healthcare.com",
      nextAvailable: "Today 2:00 PM",
      languages: ["English", "Spanish"],
      education: "Harvard Medical School",
      certifications: ["Board Certified Cardiologist", "Advanced Cardiac Life Support"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      location: "Skin Care Center",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@healthcare.com",
      nextAvailable: "Tomorrow 9:00 AM",
      languages: ["English", "Mandarin"],
      education: "Johns Hopkins University",
      certifications: ["Board Certified Dermatologist", "Mohs Surgery Specialist"]
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      experience: "10 years",
      location: "Children's Wing",
      phone: "+1 (555) 345-6789",
      email: "emily.davis@healthcare.com",
      nextAvailable: "Today 4:30 PM",
      languages: ["English", "French"],
      education: "Stanford Medical School",
      certifications: ["Board Certified Pediatrician", "Pediatric Emergency Medicine"]
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Orthopedics",
      avatar: "/placeholder.svg",
      rating: 4.7,
      reviews: 98,
      experience: "18 years",
      location: "Orthopedic Center",
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@healthcare.com",
      nextAvailable: "Monday 10:00 AM",
      languages: ["English"],
      education: "Mayo Clinic School of Medicine",
      certifications: ["Board Certified Orthopedic Surgeon", "Sports Medicine Specialist"]
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Neurology",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 76,
      experience: "14 years",
      location: "Neurology Department",
      phone: "+1 (555) 567-8901",
      email: "lisa.thompson@healthcare.com",
      nextAvailable: "Wednesday 11:00 AM",
      languages: ["English", "German"],
      education: "UCLA Medical School",
      certifications: ["Board Certified Neurologist", "Epilepsy Specialist"]
    }
  ];

  const specialties = ["all", "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology"];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Doctors</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with our expert medical professionals. Book appointments and get the care you need.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    {doctor.specialty}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    {renderStars(Math.floor(doctor.rating))}
                    <span className="text-sm text-gray-600">
                      {doctor.rating} ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  {doctor.experience}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {doctor.reviews} patients
                </div>
                <div className="flex items-center text-green-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {doctor.nextAvailable}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Education:</strong> {doctor.education}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Languages:</strong> {doctor.languages.join(', ')}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Certifications:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg">No doctors found matching your search criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorsPage;
