import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Play } from "lucide-react";
import { SearchableStory } from "@/data/searchData";

interface SearchResultsProps {
  results: SearchableStory[];
  query: string;
  onResultClick: () => void;
}

const SearchResults = ({ results, query, onResultClick }: SearchResultsProps) => {
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-coral/20 text-coral font-medium">{part}</mark> : 
        part
    );
  };

  return (
    <div className="p-4">
      <div className="text-sm text-muted-foreground mb-4 px-2">
        Found {results.length} career stor{results.length === 1 ? 'y' : 'ies'} for "{query}"
      </div>
      
      <div className="space-y-3">
        {results.map((story) => (
          <Card 
            key={story.id} 
            className="group cursor-pointer hover:shadow-medium transition-all duration-200 hover:border-coral/30"
            onClick={onResultClick}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Story Image */}
                <div className="relative flex-shrink-0">
                  <div 
                    className="w-16 h-16 bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${story.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/40 transition-all duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white text-xs px-2 py-0.5 rounded-full border text-muted-foreground">
                    {story.duration}
                  </div>
                </div>

                {/* Story Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {story.category}
                    </Badge>
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{story.location}</span>
                  </div>
                  
                  <h3 className="font-semibold text-base mb-1">
                    {highlightText(story.name, query)}
                  </h3>
                  
                  <div className="font-medium text-coral mb-2">
                    {highlightText(story.title, query)}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3 h-3 text-teal" />
                    <span className="text-sm font-medium text-teal">{story.income}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="pt-4 mt-4 border-t border-border">
        <Button variant="coral" className="w-full">
          View All {results.length} Results
        </Button>
      </div>
    </div>
  );
};

export default SearchResults;