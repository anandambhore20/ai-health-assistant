
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  StarOff, 
  ThumbsUp, 
  MessageCircle, 
  Filter,
  Plus,
  TrendingUp
} from "lucide-react";

const ReviewsPage = () => {
  const [filter, setFilter] = useState("all");

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2 days ago",
      service: "General Consultation",
      review: "Excellent service! Dr. Smith was very thorough and explained everything clearly. The staff was also very friendly and professional.",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "1 week ago",
      service: "Cardiology",
      review: "Great experience overall. The appointment was on time and the doctor was knowledgeable. Only minor issue was with parking availability.",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2 weeks ago",
      service: "Dermatology",
      review: "Amazing results! The treatment plan was effective and the follow-up care was exceptional. Highly recommend this clinic.",
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      name: "Robert Wilson",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "3 weeks ago",
      service: "Orthopedics",
      review: "Professional service and clean facilities. The doctor took time to explain my condition and treatment options thoroughly.",
      helpful: 6,
      verified: false
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "1 month ago",
      service: "Pediatrics",
      review: "Wonderful experience with my child. The staff made my daughter feel comfortable and the doctor was patient and caring.",
      helpful: 20,
      verified: true
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ) : (
            <StarOff key={star} className="h-4 w-4 text-gray-300" />
          )
        ))}
      </div>
    );
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Patient Reviews</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Read what our patients say about their healthcare experience with us.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-yellow-700">
              {averageRating.toFixed(1)}
            </CardTitle>
            <CardDescription className="flex items-center justify-center">
              {renderStars(Math.round(averageRating))}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-yellow-600">Average Rating</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-700">
              {totalReviews}
            </CardTitle>
            <CardDescription>
              <MessageCircle className="h-5 w-5 mx-auto text-blue-500" />
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-blue-600">Total Reviews</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-700">
              96%
            </CardTitle>
            <CardDescription>
              <TrendingUp className="h-5 w-5 mx-auto text-green-500" />
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-green-600">Recommend Us</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter Reviews
          </Button>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Reviews</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="verified">Verified Only</option>
          </select>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Write Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      {review.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">• {review.date}</span>
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {review.service}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{review.review}</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
