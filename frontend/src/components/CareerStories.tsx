import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, MapPin, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { useVideos } from "@/hooks/useAPI";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCareerThumbnail } from "@/lib/utils";

const CareerStories = () => {
  const navigate = useNavigate();
  const { data: videos, isLoading, error } = useVideos();
  
  // Get the first 3 videos for homepage display
  const displayedVideos = videos?.slice(0, 3) || [];
  
  // Resolve thumbnail from local assets based on id (consistent across app)
  const getThumbnail = (video: any) => {
    return getCareerThumbnail(video.id);
  };
  
  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-gradient-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Real People, Real Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how ordinary people built extraordinary careers doing what they love
            </p>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-coral" />
            <span className="ml-3 text-lg text-muted-foreground">Loading stories...</span>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-20 px-6 bg-gradient-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Real People, Real Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how ordinary people built extraordinary careers doing what they love
            </p>
          </div>
          
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to load stories. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real People, Real Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how ordinary people built extraordinary careers doing what they love
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedVideos.map((video) => (
            <Card key={video.id} className="group overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative">
                <div 
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${getThumbnail(video)})` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="glass" size="lg" className="rounded-full">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                
                <div className="text-lg font-medium text-coral mb-4">{video.title}</div>
                
                <p className="text-muted-foreground mb-4">{video.short_description}</p>
                
                <Button 
                  variant="coral" 
                  className="w-full mt-4"
                  onClick={() => navigate(`/story/${video.id}`)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline-coral" 
            size="lg"
            onClick={() => navigate('/stories')}
          >
            View All Stories ({videos?.length || 0})
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerStories;