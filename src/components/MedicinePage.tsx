
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Star,
  Truck,
  Shield,
  Clock,
  Pill,
  Heart,
  Brain,
  Bone
} from "lucide-react";

const MedicinePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const medicines = [
    {
      id: 1,
      name: "Aspirin 81mg",
      category: "Pain Relief",
      price: 12.99,
      originalPrice: 15.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 245,
      description: "Low-dose aspirin for heart health and pain relief",
      inStock: true,
      prescription: false,
      brand: "Generic",
      form: "Tablet",
      quantity: "100 tablets",
      activeIngredient: "Acetylsalicylic acid"
    },
    {
      id: 2,
      name: "Metformin 500mg",
      category: "Diabetes",
      price: 25.99,
      originalPrice: 32.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      description: "Type 2 diabetes management medication",
      inStock: true,
      prescription: true,
      brand: "Glucophage",
      form: "Tablet",
      quantity: "60 tablets",
      activeIngredient: "Metformin hydrochloride"
    },
    {
      id: 3,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      price: 8.99,
      originalPrice: 11.99,
      image: "/placeholder.svg",
      rating: 4.4,
      reviews: 189,
      description: "Anti-inflammatory pain reliever",
      inStock: true,
      prescription: false,
      brand: "Advil",
      form: "Capsule",
      quantity: "50 capsules",
      activeIngredient: "Ibuprofen"
    },
    {
      id: 4,
      name: "Lisinopril 10mg",
      category: "Blood Pressure",
      price: 18.99,
      originalPrice: 24.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 98,
      description: "ACE inhibitor for blood pressure control",
      inStock: true,
      prescription: true,
      brand: "Prinivil",
      form: "Tablet",
      quantity: "30 tablets",
      activeIngredient: "Lisinopril"
    },
    {
      id: 5,
      name: "Vitamin D3 1000 IU",
      category: "Vitamins",
      price: 14.99,
      originalPrice: 19.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 312,
      description: "Essential vitamin for bone and immune health",
      inStock: true,
      prescription: false,
      brand: "Nature Made",
      form: "Softgel",
      quantity: "90 softgels",
      activeIngredient: "Cholecalciferol"
    },
    {
      id: 6,
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      price: 22.99,
      originalPrice: 28.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 167,
      description: "Proton pump inhibitor for acid reflux",
      inStock: false,
      prescription: false,
      brand: "Prilosec",
      form: "Capsule",
      quantity: "42 capsules",
      activeIngredient: "Omeprazole"
    }
  ];

  const categories = ["all", "Pain Relief", "Diabetes", "Blood Pressure", "Vitamins", "Digestive Health"];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: Math.max((prev[medicineId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, count]) => {
      const medicine = medicines.find(m => m.id === parseInt(id));
      return total + (medicine ? medicine.price * count : 0);
    }, 0);
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Pain Relief": return <Heart className="h-4 w-4" />;
      case "Diabetes": return <Pill className="h-4 w-4" />;
      case "Blood Pressure": return <Heart className="h-4 w-4" />;
      case "Vitamins": return <Bone className="h-4 w-4" />;
      case "Digestive Health": return <Brain className="h-4 w-4" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Online Medicine Store</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Order your medications online with fast delivery and competitive prices.
        </p>
      </div>

      {/* Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="flex items-center space-x-3 p-4">
            <Truck className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-semibold text-green-700">Free Delivery</p>
              <p className="text-sm text-green-600">On orders over $50</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="flex items-center space-x-3 p-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-700">Licensed Pharmacy</p>
              <p className="text-sm text-blue-600">FDA approved medications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="flex items-center space-x-3 p-4">
            <Clock className="h-8 w-8 text-purple-600" />
            <div>
              <p className="font-semibold text-purple-700">24/7 Support</p>
              <p className="text-sm text-purple-600">Expert pharmacist advice</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({getTotalItems()}) - ${getTotalPrice().toFixed(2)}
        </Button>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <Card key={medicine.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      {getCategoryIcon(medicine.category)}
                      <span>{medicine.category}</span>
                    </Badge>
                    {medicine.prescription && (
                      <Badge variant="destructive" className="text-xs">
                        Prescription Required
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <CardDescription className="text-sm">{medicine.description}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${medicine.price}</p>
                  {medicine.originalPrice > medicine.price && (
                    <p className="text-sm text-gray-500 line-through">${medicine.originalPrice}</p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {renderStars(Math.floor(medicine.rating))}
                  <span className="text-gray-600">({medicine.reviews})</span>
                </div>
                <Badge variant={medicine.inStock ? "default" : "destructive"}>
                  {medicine.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p><strong>Brand:</strong> {medicine.brand}</p>
                <p><strong>Form:</strong> {medicine.form}</p>
                <p><strong>Quantity:</strong> {medicine.quantity}</p>
                <p><strong>Active:</strong> {medicine.activeIngredient}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                {cart[medicine.id] > 0 ? (
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFromCart(medicine.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold px-3">{cart[medicine.id]}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => addToCart(medicine.id)}
                      disabled={!medicine.inStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={() => addToCart(medicine.id)}
                    disabled={!medicine.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg">No medicines found matching your search criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
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

export default MedicinePage;
