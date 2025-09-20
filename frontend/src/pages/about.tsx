import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Career<span className="text-coral">Path</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Helping young Indians discover careers that actually make sense to them
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story: From Confusion to Clarity</h2>
            <div className="space-y-4 text-foreground">
              <p>
                This project didn't start in a boardroom. It started in a late-night conversation between college friends in Rajasthan, watching brilliant, creative people get pushed into the same few "safe" career paths. We saw the immense pressure, the lack of real guidance, and the frustration of being stuck in a race you never wanted to run. We knew there had to be a better way.
              </p>
              <p>
                The problem, we realized, wasn't a lack of opportunities in India; it was a crisis of <strong>awareness, confidence, and experience</strong>.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <div className="space-y-4 text-foreground">
              <p>
                Our mission is to end career confusion. We are here to build a platform that empowers every student to discover their own path, on their own terms.
              </p>
              <p>
                We believe a story is more powerful than a statistic. We believe your past education is a toolkit, not a trap. And we believe the best way to find your future is to get real, hands-on experience today.
              </p>
              <p>
                That's why our platform is built on three core principles:
              </p>
              <ul className="space-y-2 ml-6">
                <li><strong>Discover:</strong> Explore authentic stories from a diverse range of real-world professionals.</li>
                <li><strong>Connect:</strong> Use our unique AI to build a bridge between the skills you already have and the careers you're curious about.</li>
                <li><strong>Experience:</strong> Take action with real, paid "micro-internships" and projects that build your portfolio and your confidence.</li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Meet the Pathfinders</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We're <strong>"Team Langur"</strong>—a group of students who decided to build the solution we wish we had ourselves. Our name is a reminder of who we are: a group of friends who came together to solve a problem we were all facing.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Join Us on Our Journey</h2>
            <div className="space-y-4 text-foreground">
              <p>This is more than just an app; it's a community.</p>
              <ul className="space-y-2 ml-6">
                <li><strong>If you're a student feeling lost,</strong> we're building this for you.</li>
                <li><strong>If you're a professional with a story to share,</strong> we want to hear from you.</li>
                <li><strong>If you're a company that wants to offer opportunities,</strong> let's partner.</li>
              </ul>
              <p className="mt-6 text-xl font-semibold">
                Together, we can create a future where every person has the clarity and confidence to build a career they love.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
