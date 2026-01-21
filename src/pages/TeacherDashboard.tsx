import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TreeDeciduous, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  XCircle,
  BarChart3,
  Eye,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForestScene from "@/components/forest/ForestScene";

interface PendingVerification {
  id: string;
  studentName: string;
  studentInitials: string;
  questTitle: string;
  submittedAt: string;
  proofText: string;
  hasImage: boolean;
}

interface StudentProgress {
  id: string;
  name: string;
  initials: string;
  forestGrowth: number;
  questsCompleted: number;
  lastActive: string;
}

const TeacherDashboard = () => {
  const [classForestGrowth] = useState(68);
  
  const [pendingVerifications] = useState<PendingVerification[]>([
    {
      id: "1",
      studentName: "Arjun Sharma",
      studentInitials: "AS",
      questTitle: "Community Clean-Up Drive",
      submittedAt: "2 hours ago",
      proofText: "Participated in the neighborhood clean-up with my family. We collected about 3kg of plastic waste from the park area.",
      hasImage: true,
    },
    {
      id: "2",
      studentName: "Priya Patel",
      studentInitials: "PP",
      questTitle: "Week-Long Waste Segregation",
      submittedAt: "5 hours ago",
      proofText: "Successfully segregated waste for 7 days. Attached photos of our color-coded bins.",
      hasImage: true,
    },
    {
      id: "3",
      studentName: "Rohan Mehta",
      studentInitials: "RM",
      questTitle: "Plant a Sapling",
      submittedAt: "1 day ago",
      proofText: "Planted a neem tree in our backyard. Will continue to water and care for it.",
      hasImage: true,
    },
  ]);

  const [students] = useState<StudentProgress[]>([
    { id: "1", name: "Arjun Sharma", initials: "AS", forestGrowth: 72, questsCompleted: 8, lastActive: "Today" },
    { id: "2", name: "Priya Patel", initials: "PP", forestGrowth: 65, questsCompleted: 6, lastActive: "Today" },
    { id: "3", name: "Rohan Mehta", initials: "RM", forestGrowth: 58, questsCompleted: 5, lastActive: "Yesterday" },
    { id: "4", name: "Sneha Gupta", initials: "SG", forestGrowth: 45, questsCompleted: 4, lastActive: "2 days ago" },
    { id: "5", name: "Vikram Singh", initials: "VS", forestGrowth: 38, questsCompleted: 3, lastActive: "3 days ago" },
    { id: "6", name: "Ananya Reddy", initials: "AR", forestGrowth: 82, questsCompleted: 10, lastActive: "Today" },
  ]);

  const handleApprove = (id: string) => {
    console.log("Approved verification:", id);
  };

  const handleReject = (id: string) => {
    console.log("Rejected verification:", id);
  };

  const stats = [
    { label: "Total Students", value: "28", icon: Users, color: "text-primary" },
    { label: "Active This Week", value: "24", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Pending Reviews", value: pendingVerifications.length.toString(), icon: Clock, color: "text-amber-600" },
    { label: "Total Quests Done", value: "156", icon: CheckCircle2, color: "text-sky-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Teacher Hub</h1>
            <p className="text-muted-foreground">
              Monitor student progress and verify environmental actions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-primary mr-2" />
              Grade 10-A
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Class Forest */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display flex items-center gap-2">
                    <TreeDeciduous className="w-5 h-5 text-primary" />
                    Class Forest
                  </CardTitle>
                  <CardDescription>Collective ecosystem of Grade 10-A</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <ForestScene growthLevel={classForestGrowth} className="w-full h-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{classForestGrowth}%</p>
                  <p className="text-xs text-muted-foreground">Total Growth</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-xs text-muted-foreground">Quests Completed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">89kg</p>
                  <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Weekly Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Quest Completion Rate</span>
                  <span className="font-semibold text-primary">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Active Participation</span>
                  <span className="font-semibold text-primary">86%</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Verification Speed</span>
                  <span className="font-semibold text-primary">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Top Categories This Week</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-secondary text-earth">Waste</Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">Water</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Nature</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Verifications and Students */}
        <Tabs defaultValue="verifications" className="mt-8">
          <TabsList>
            <TabsTrigger value="verifications" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending Verifications
              <Badge variant="secondary">{pendingVerifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="w-4 h-4" />
              All Students
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="mt-6">
            <div className="space-y-4">
              {pendingVerifications.map((verification) => (
                <Card key={verification.id} className="hover:shadow-soft transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <Avatar className="h-12 w-12 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {verification.studentInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <div>
                            <p className="font-semibold">{verification.studentName}</p>
                            <p className="text-sm text-muted-foreground">{verification.questTitle}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{verification.submittedAt}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          "{verification.proofText}"
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          {verification.hasImage && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Photo
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleApprove(verification.id)}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline" 
                            size="sm" 
                            className="gap-2 text-destructive hover:text-destructive"
                            onClick={() => handleReject(verification.id)}
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {student.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{student.name}</p>
                          <span className="text-xs text-muted-foreground">{student.lastActive}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Progress value={student.forestGrowth} className="h-2" />
                          </div>
                          <span className="text-sm font-medium text-primary w-12 text-right">
                            {student.forestGrowth}%
                          </span>
                          <Badge variant="secondary" className="shrink-0">
                            {student.questsCompleted} quests
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
