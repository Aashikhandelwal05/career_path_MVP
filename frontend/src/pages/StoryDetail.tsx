import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, MapPin, TrendingUp, Loader2, AlertCircle, Bot } from "lucide-react";
import { useJob, useAskAI } from "@/hooks/useAPI";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRef, useState, useEffect } from "react";
import { getCareerThumbnail } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMessage } from "@/services/api";

// Use shared thumbnail resolver for consistency

const StoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customQuestion, setCustomQuestion] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const jobId = id || '';
  const { data: job, isLoading, error } = useJob(jobId);
  const askAI = useAskAI();
  
  // Get user ID from localStorage
  const userId = localStorage.getItem('userId');
  
  // Resolve thumbnail using shared mapping
  const getThumbnail = (jobId: string) => getCareerThumbnail(jobId);
  
  const handleAskAI = async (question?: string) => {
    try {
      const q = question || customQuestion || undefined;
      if (!q) return;

      const newHistory: ChatMessage[] = [...history, { role: 'user', content: q }];
      setHistory(newHistory);

      const res = await askAI.mutateAsync({ 
        jobId, 
        question: q,
        history: newHistory,
        userId: userId || undefined,
      });

      setHistory((prev) => [...prev, { role: 'assistant', content: res.response }]);
      // Keep dialog open to display the response without requiring another click
      // Optionally clear the custom input after successful ask
      setCustomQuestion('');
    } catch (error) {
      console.error('Error asking AI:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-foreground">Loading career details...</h1>
        </div>
      </div>
    );
  }
  
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center max-w-md">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error ? 'Unable to load career details. Please try again later.' : 'Career not found.'}
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => navigate('/stories')} 
            variant="coral" 
            className="mt-4"
          >
            Back to Stories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header with back button */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Large thumbnail - 16:9 aspect ratio */}
        <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden shadow-large">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getThumbnail(jobId)})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Career details */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            {job.title}
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              {job.description}
            </p>
            
            {/* Career Overview Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-background/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-coral">💰 Earning Potential</h3>
                <p className="text-foreground font-medium">{job.earning}</p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-teal">🎓 Qualification</h3>
                <p className="text-foreground">{job.qualification}</p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-purple-600">💼 Investment</h3>
                <p className="text-foreground">{job.investment}</p>
              </div>
            </div>
            
            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-background/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-coral">🛠️ Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-coral/10 text-coral rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              {job.pros && job.pros.length > 0 && (
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3 text-green-700">✅ Advantages</h3>
                  <ul className="space-y-2">
                    {job.pros.map((pro, index) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.cons && job.cons.length > 0 && (
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3 text-red-700">⚠️ Challenges</h3>
                  <ul className="space-y-2">
                    {job.cons.map((con, index) => (
                      <li key={index} className="text-red-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Growth Prospects */}
            {job.growth && (
              <div className="bg-gradient-accent rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">🚀 Growth Prospects</h3>
                <p className="text-foreground">{job.growth}</p>
              </div>
            )}
          </div>
        </div>

        {/* Ask AI section */}
        <div className="text-center space-y-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="xl" className="text-lg px-12 py-4">
                <MessageCircle className="w-6 h-6 mr-3" />
                Ask AI About This Career
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-coral" />
                  Ask AI About {job.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAskAI("What skills do I need to get started in this career?")}
                    disabled={askAI.isPending}
                    className="justify-start text-left h-auto p-3"
                  >
                    What skills do I need to get started?
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAskAI("What is the typical career progression path?")}
                    disabled={askAI.isPending}
                    className="justify-start text-left h-auto p-3"
                  >
                    What is the typical career progression?
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAskAI("What are the challenges and rewards of this career?")}
                    disabled={askAI.isPending}
                    className="justify-start text-left h-auto p-3"
                  >
                    What are the challenges and rewards?
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Or ask your own question:</label>
                  <Textarea
                    placeholder="Type your question about this career..."
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={() => handleAskAI()}
                    disabled={askAI.isPending || !customQuestion.trim()}
                    className="w-full"
                  >
                    {askAI.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Getting AI Response...
                      </>
                    ) : (
                      'Ask AI'
                    )}
                  </Button>
                </div>
                
                {history.length > 0 && (
                  <div className="bg-background/50 rounded-lg p-4 mt-4 space-y-3 max-h-80 overflow-auto">
                    {history.map((m, idx) => (
                      <div key={idx} className={m.role === 'user' ? 'text-foreground' : 'text-muted-foreground'}>
                        <div className="text-xs font-medium mb-1">
                          {m.role === 'user' ? 'You' : m.role === 'assistant' ? 'AI' : 'System'}
                        </div>
                        <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
                
                {askAI.error && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Unable to get AI response. Please try again.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;