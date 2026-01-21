import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplet, TreeDeciduous, Trash2, TrendingUp } from "lucide-react";

interface ImpactStatsProps {
  co2Saved: number;
  waterSaved: number;
  wasteReduced: number;
  treesPlanted: number;
  questsCompleted: number;
}

const ImpactStats = ({ co2Saved, waterSaved, wasteReduced, treesPlanted, questsCompleted }: ImpactStatsProps) => {
  const stats = [
    {
      label: 'CO₂ Saved',
      value: `${co2Saved}kg`,
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Carbon dioxide prevented',
    },
    {
      label: 'Water Saved',
      value: `${waterSaved}L`,
      icon: Droplet,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      description: 'Liters conserved',
    },
    {
      label: 'Waste Reduced',
      value: `${wasteReduced}kg`,
      icon: Trash2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Waste diverted from landfill',
    },
    {
      label: 'Trees Cared For',
      value: treesPlanted,
      icon: TreeDeciduous,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Trees planted or maintained',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Your Environmental Impact</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span>{questsCompleted} quests completed</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="relative overflow-hidden group hover:shadow-soft transition-shadow">
              <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 group-hover:scale-125 transition-transform" />
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground/70">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ImpactStats;
