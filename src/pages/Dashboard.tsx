import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TreeDeciduous, Users, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForestScene from "@/components/forest/ForestScene";
import QuestCard, { Quest } from "@/components/quests/QuestCard";
import ImpactStats from "@/components/dashboard/ImpactStats";

const Dashboard = () => {
  const [forestGrowth, setForestGrowth] = useState(42);
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "Week-Long Waste Segregation",
      description: "Properly segregate wet and dry waste at home or school for 7 consecutive days.",
      category: "waste",
      difficulty: "easy",
      forestGrowth: 5,
      co2Impact: 2,
      status: "available",
    },
    {
      id: "2",
      title: "Water Conservation Challenge",
      description: "Reduce water usage by timing showers and fixing leaky taps. Document your efforts.",
      category: "water",
      difficulty: "medium",
      forestGrowth: 7,
      co2Impact: 3,
      status: "available",
    },
    {
      id: "3",
      title: "Plant a Sapling",
      description: "Plant a tree sapling and commit to caring for it. Take photos of the planting process.",
      category: "nature",
      difficulty: "medium",
      forestGrowth: 10,
      co2Impact: 5,
      status: "in-progress",
    },
    {
      id: "4",
      title: "Community Clean-Up Drive",
      description: "Participate in or organize a neighborhood clean-up. Collect at least 2kg of litter.",
      category: "waste",
      difficulty: "hard",
      forestGrowth: 15,
      co2Impact: 4,
      status: "pending-verification",
    },
    {
      id: "5",
      title: "Electricity Saving Week",
      description: "Turn off lights and unplug devices when not in use. Track your energy savings.",
      category: "energy",
      difficulty: "easy",
      forestGrowth: 4,
      co2Impact: 3,
      status: "completed",
    },
    {
      id: "6",
      title: "Create a Compost System",
      description: "Set up a small composting system at home using kitchen waste.",
      category: "nature",
      difficulty: "hard",
      forestGrowth: 12,
      co2Impact: 6,
      status: "available",
    },
  ]);

  const handleSubmitProof = (questId: string, proof: { image?: File; text: string }) => {
    setQuests(prev =>
      prev.map(q =>
        q.id === questId ? { ...q, status: "pending-verification" as const } : q
      )
    );
    console.log("Proof submitted for quest:", questId, proof);
  };

  const activeQuests = quests.filter(q => q.status !== "completed");
  const completedQuests = quests.filter(q => q.status === "completed");

  // Calculate stats
  const completedCount = completedQuests.length;
  const co2Saved = completedQuests.reduce((acc, q) => acc + q.co2Impact, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">My Forest</h1>
          <p className="text-muted-foreground">
            Complete quests to grow your ecosystem and track your environmental impact.
          </p>
        </div>

        {/* Forest View */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-[16/9] lg:aspect-[2/1]">
                <ForestScene growthLevel={forestGrowth} className="w-full h-full" />
              </div>
            </Card>
          </div>

          {/* Forest Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <TreeDeciduous className="w-5 h-5 text-primary" />
                  Forest Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Growth Level</span>
                    <span className="font-semibold text-primary">{forestGrowth}%</span>
                  </div>
                  <Progress value={forestGrowth} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-primary">{Math.floor(forestGrowth / 10)}</p>
                    <p className="text-xs text-muted-foreground">Trees Grown</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-primary">{forestGrowth >= 30 ? 1 : 0}</p>
                    <p className="text-xs text-muted-foreground">Water Bodies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Class Forest
                </CardTitle>
                <CardDescription>Grade 10-A collective progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Combined Growth</span>
                  <span className="font-semibold text-primary">68%</span>
                </div>
                <Progress value={68} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  28 students contributing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-8">
          <ImpactStats
            co2Saved={co2Saved + 12}
            waterSaved={145}
            wasteReduced={8}
            treesPlanted={3}
            questsCompleted={completedCount}
          />
        </div>

        {/* Quests */}
        <Tabs defaultValue="active" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="active" className="gap-2">
                <Clock className="w-4 h-4" />
                Active Quests
                <Badge variant="secondary" className="ml-1">{activeQuests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Completed
                <Badge variant="secondary" className="ml-1">{completedQuests.length}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onSubmitProof={handleSubmitProof}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onSubmitProof={handleSubmitProof}
                />
              ))}
            </div>
            {completedQuests.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No completed quests yet. Start taking action to grow your forest!
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
