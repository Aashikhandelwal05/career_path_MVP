import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Camera, 
  Palette, 
  Wrench, 
  Laptop, 
  Utensils, 
  Megaphone,
  ArrowRight,
  Clock,
  DollarSign,
  BookOpen
} from "lucide-react";

const roadmaps = [
  {
    id: 1,
    title: "Photography",
    icon: Camera,
    color: "coral",
    timeToStart: "1-3 months",
    initialCost: "₹15K-₹50K",
    avgIncome: "₹25K-₹1L/month",
    steps: ["Learn camera basics", "Practice daily", "Build portfolio", "Find clients"],
    skills: ["Composition", "Lighting", "Editing", "Client management"]
  },
  {
    id: 2,
    title: "Makeup Artist",
    icon: Palette,
    color: "teal",
    timeToStart: "2-4 months",
    initialCost: "₹10K-₹30K",
    avgIncome: "₹20K-₹80K/month",
    steps: ["Take basic course", "Practice on friends", "Create portfolio", "Network with vendors"],
    skills: ["Color theory", "Face shapes", "Product knowledge", "Hygiene"]
  },
  {
    id: 3,
    title: "Electrician",
    icon: Wrench,
    color: "mustard",
    timeToStart: "3-6 months",
    initialCost: "₹5K-₹20K",
    avgIncome: "₹30K-₹70K/month",
    steps: ["Learn basics", "Get apprenticeship", "Practice safety", "Get certified"],
    skills: ["Wiring", "Safety protocols", "Problem solving", "Tool usage"]
  },
  {
    id: 4,
    title: "Web Developer",
    icon: Laptop,
    color: "coral",
    timeToStart: "4-8 months",
    initialCost: "₹5K-₹15K",
    avgIncome: "₹40K-₹2L/month",
    steps: ["Learn HTML/CSS", "JavaScript basics", "Build projects", "Apply for jobs"],
    skills: ["Programming", "Problem solving", "Design sense", "Communication"]
  },
  {
    id: 5,
    title: "Chef",
    icon: Utensils,
    color: "teal",
    timeToStart: "2-6 months",
    initialCost: "₹10K-₹40K",
    avgIncome: "₹25K-₹1L/month",
    steps: ["Learn basics", "Work in kitchen", "Master techniques", "Start own venture"],
    skills: ["Cooking techniques", "Menu planning", "Food safety", "Creativity"]
  },
  {
    id: 6,
    title: "Digital Marketer",
    icon: Megaphone,
    color: "mustard",
    timeToStart: "2-4 months",
    initialCost: "₹5K-₹25K",
    avgIncome: "₹30K-₹1.5L/month",
    steps: ["Learn platforms", "Run test campaigns", "Build portfolio", "Find clients"],
    skills: ["Analytics", "Content creation", "Strategy", "Communication"]
  }
];

const CareerRoadmaps = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Career Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides to start any career. See exactly what it takes to get started.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => {
            const IconComponent = roadmap.icon;
            const colorClass = roadmap.color === 'coral' ? 'text-coral' : 
                              roadmap.color === 'teal' ? 'text-teal' : 'text-mustard';
            const bgColorClass = roadmap.color === 'coral' ? 'bg-coral/10' : 
                                 roadmap.color === 'teal' ? 'bg-teal/10' : 'bg-mustard/10';
            
            return (
              <Card key={roadmap.id} className="group overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${bgColorClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${colorClass}`} />
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl mb-4">{roadmap.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Time to start:</span>
                      <span className="font-medium">{roadmap.timeToStart}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Initial cost:</span>
                      <span className="font-medium">{roadmap.initialCost}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Avg income:</span>
                      <span className={`font-semibold ${colorClass}`}>{roadmap.avgIncome}</span>
                    </div>
                  </div>
                  
                  {/* Hidden content that shows on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-500 ease-in-out">
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-2">Getting Started:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                        {roadmap.steps.map((step, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-coral rounded-full" />
                            {step}
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="font-medium mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {roadmap.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-muted text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline-coral" className="w-full group">
                    View Full Roadmap
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="coral" size="lg">
            Explore All Career Paths (50+)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerRoadmaps;