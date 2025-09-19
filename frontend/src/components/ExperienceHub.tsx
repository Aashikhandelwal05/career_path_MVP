import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Camera, 
  Brush, 
  BarChart3, 
  Video, 
  Search, 
  Package, 
  Cookie, 
  Wrench, 
  MapPin 
} from "lucide-react";

const ExperienceHub = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Experience listings data
  const experiences = [
    {
      id: 1,
      title: "Assist with makeup for a pre-wedding photoshoot",
      icon: Camera,
      story: "Makeup Artist"
    },
    {
      id: 2,
      title: "Design three social media posts for a local festival",
      icon: Brush,
      story: "Freelance Graphic Designer"
    },
    {
      id: 3,
      title: "Clean and visualize a sample sales dataset using Excel",
      icon: BarChart3,
      story: "Data Analyst"
    },
    {
      id: 4,
      title: "Edit a 5-minute 'Day in the Life' vlog for a content creator",
      icon: Video,
      story: "School Student YouTuber"
    },
    {
      id: 5,
      title: "Conduct market research for a new food stall location",
      icon: Search,
      story: "Street Food Seller"
    },
    {
      id: 6,
      title: "Create a simple 3D model of a custom bookshelf using SketchUp",
      icon: Package,
      story: "Carpenter"
    },
    {
      id: 7,
      title: "Design and test a new cookie recipe for a local bakery's menu",
      icon: Cookie,
      story: "Homemaker Baker"
    },
    {
      id: 8,
      title: "Write a 'How-To' guide for a basic car maintenance task",
      icon: Wrench,
      story: "Mechanic"
    },
    {
      id: 9,
      title: "Plan the most efficient 3-hour tourist route for seeing city landmarks",
      icon: MapPin,
      story: "Rickshaw Driver"
    }
  ];

  const handleApplyClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience Hub
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects to build your portfolio and gain practical experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => {
            const IconComponent = experience.icon;
            return (
              <Card key={experience.id} className="group overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-coral/10 rounded-full mr-4">
                      <IconComponent className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-foreground">{experience.title}</h3>
                      <p className="text-sm text-muted-foreground">For: {experience.story}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="coral" 
                    className="w-full mt-4"
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Coming Soon Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Our Experience Hub
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              "This is a preview of the types of real-world projects and micro-internships you'll find on our platform. The full marketplace, connecting you with hundreds of companies, will be available after our official launch. Stay tuned!"
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExperienceHub;