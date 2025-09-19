import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CareerStories from "@/components/CareerStories";
import CareerRoadmaps from "@/components/CareerRoadmaps";
import ExperienceHub from "@/components/ExperienceHub";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="stories">
          <CareerStories />
        </section>
        <ExperienceHub />
        <section id="roadmaps">
          <CareerRoadmaps />
        </section>
      </main>
    </div>
  );
};

export default Index;