
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OverviewPage from "@/components/OverviewPage";
import ContactPage from "@/components/ContactPage";
import ReviewsPage from "@/components/ReviewsPage";
import DoctorsPage from "@/components/DoctorsPage";
import MedicinePage from "@/components/MedicinePage";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderMainContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage />;
      case "contact":
        return <ContactPage />;
      case "reviews":
        return <ReviewsPage />;
      case "doctors":
        return <DoctorsPage />;
      case "medicine":
        return <MedicinePage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <Card className="h-full">
        <CardContent className="p-6">
          {renderMainContent()}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
