import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import SearchResults from "./SearchResults";
import { searchStories } from "@/data/searchData";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchStories(query);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (query.trim() && results.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type a job — we'll show you the real stories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="pl-12 pr-12 h-14 text-lg bg-white/90 backdrop-blur-md border-2 border-white/30 focus:border-coral rounded-2xl shadow-large"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-large border border-border max-h-96 overflow-y-auto z-50">
          {results.length > 0 ? (
            <SearchResults 
              results={results} 
              query={query}
              onResultClick={() => setIsOpen(false)}
            />
          ) : query.trim() ? (
            <div className="p-6 text-center">
              <div className="text-muted-foreground mb-2">
                No stories found for "{query}"
              </div>
              <div className="text-sm text-muted-foreground">
                Try searching for: developer, chef, photographer, content creator, designer...
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Popular Searches */}
      {!query && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground mr-2">Popular:</span>
          {['Developer', 'Chef', 'Photography', 'Content Creator', 'Designer'].map((term) => (
            <Button
              key={term}
              variant="ghost"
              size="sm"
              onClick={() => setQuery(term.toLowerCase())}
              className="text-xs h-7 px-3 bg-white/50 hover:bg-coral hover:text-white transition-colors"
            >
              {term}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;