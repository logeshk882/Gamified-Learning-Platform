import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TreeDeciduous, Users, Award, Sprout, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ForestScene from "@/components/forest/ForestScene";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: "Watch Your Forest Grow",
      description: "Every real-world action you take adds life to your virtual forest ecosystem.",
    },
    {
      icon: CheckCircle2,
      title: "Verified Impact",
      description: "Submit proof of your actions and get verified by teachers or peers.",
    },
    {
      icon: Users,
      title: "Collective Progress",
      description: "Join your class to build a shared forest that thrives on teamwork.",
    },
    {
      icon: Award,
      title: "Learn By Doing",
      description: "Unlock educational content that explains why your actions matter.",
    },
  ];

  const questExamples = [
    "Segregate waste at home for a week",
    "Plant and care for a sapling",
    "Reduce electricity usage by 10%",
    "Participate in a local clean-up drive",
    "Create a composting system",
    "Save water during daily activities",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky/10 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sprout className="w-4 h-4" />
                Real actions. Real impact.
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Grow a Forest Through{" "}
                <span className="text-primary">Real-World</span>{" "}
                Environmental Action
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                EcoQuest transforms environmental education into a living experience. 
                Complete eco-friendly quests, watch your virtual forest flourish, 
                and see the real impact of your collective actions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2 shadow-forest">
                    Start Your Journey
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/teacher">
                  <Button size="lg" variant="outline" className="gap-2">
                    Teacher Dashboard
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">12,450</p>
                  <p className="text-sm text-muted-foreground">Trees Grown</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">8,200</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">45,000</p>
                  <p className="text-sm text-muted-foreground">kg CO₂ Saved</p>
                </div>
              </div>
            </div>

            {/* Forest Preview */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-forest bg-gradient-sky">
                <ForestScene growthLevel={65} />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-soft border animate-float">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TreeDeciduous className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Forest Growing!</p>
                    <p className="text-xs text-muted-foreground">+5 trees this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How EcoQuest Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple but powerful cycle that connects real-world action to virtual growth and environmental learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Quest",
                description: "Pick from environmental challenges like waste segregation, water conservation, or tree planting.",
              },
              {
                step: "02",
                title: "Take Real Action",
                description: "Complete the task in the real world and submit photo or text proof for verification.",
              },
              {
                step: "03",
                title: "Watch Your Forest Grow",
                description: "Once verified, see new trees, animals, and life appear in your virtual ecosystem.",
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <Card className="h-full transition-all duration-300 hover:shadow-forest hover:-translate-y-1">
                  <CardContent className="pt-8 pb-6">
                    <span className="text-6xl font-display font-bold text-primary/10 absolute top-4 right-6">
                      {item.step}
                    </span>
                    <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Not Just Points and Badges—<br />
                <span className="text-primary">Real Environmental Impact</span>
              </h2>
              <p className="text-muted-foreground">
                Unlike traditional gamification, EcoQuest focuses on meaningful action. 
                Your forest only grows when you make verified real-world contributions 
                to the environment.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 p-3 rounded-lg bg-primary/10 h-fit">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <Card className="p-6 shadow-forest">
                <h3 className="font-display text-lg font-semibold mb-4">Example Quests</h3>
                <div className="space-y-3">
                  {questExamples.map((quest, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{quest}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-sky/5">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of students and teachers creating real environmental impact 
              through collective action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 shadow-forest">
                  Start Growing Your Forest
                  <TreeDeciduous className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
