import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { useVideos } from "@/hooks/useAPI";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCareerThumbnail } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Stories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: videos, isLoading, error } = useVideos();
  
  const [filteredVideos, setFilteredVideos] = useState([]);
  
  useEffect(() => {
    if (videos) {
      const filtered = videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.short_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [videos, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-foreground">Loading career stories...</h1>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to load career stories. Please try again later.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => navigate('/')} 
            variant="coral" 
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header with back button */}
      <div className="bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Career Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore real journeys of professionals across diverse fields. Find inspiration for your own path.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search careers..."
              className="w-full px-4 py-3 pl-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-coral"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Video grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <Link 
                key={video.id} 
                to={`/story/${video.id}`}
                className="group block bg-background rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 border border-border"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getCareerThumbnail(video.id)})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-coral transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {video.short_description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>India</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No careers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;