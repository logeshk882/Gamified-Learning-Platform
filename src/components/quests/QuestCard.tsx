import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Droplet, Trash2, TreeDeciduous, Upload, CheckCircle2 } from "lucide-react";

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'waste' | 'water' | 'energy' | 'nature';
  difficulty: 'easy' | 'medium' | 'hard';
  forestGrowth: number;
  co2Impact: number;
  status: 'available' | 'in-progress' | 'pending-verification' | 'completed';
}

interface QuestCardProps {
  quest: Quest;
  onSubmitProof: (questId: string, proof: { image?: File; text: string }) => void;
}

const categoryIcons = {
  waste: Trash2,
  water: Droplet,
  energy: Leaf,
  nature: TreeDeciduous,
};

const categoryColors = {
  waste: 'bg-amber-100 text-amber-700 border-amber-200',
  water: 'bg-sky-100 text-sky-700 border-sky-200',
  energy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  nature: 'bg-green-100 text-green-700 border-green-200',
};

const difficultyColors = {
  easy: 'bg-green-50 text-green-600',
  medium: 'bg-yellow-50 text-yellow-600',
  hard: 'bg-orange-50 text-orange-600',
};

const QuestCard = ({ quest, onSubmitProof }: QuestCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [proofText, setProofText] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const CategoryIcon = categoryIcons[quest.category];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmitProof(quest.id, { image: proofImage || undefined, text: proofText });
    setIsOpen(false);
    setProofText("");
    setProofImage(null);
    setImagePreview(null);
  };

  const isCompleted = quest.status === 'completed';
  const isPending = quest.status === 'pending-verification';

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-forest hover:-translate-y-1 ${
      isCompleted ? 'opacity-80' : ''
    }`}>
      {/* Decorative top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        quest.category === 'waste' ? 'bg-amber-400' :
        quest.category === 'water' ? 'bg-sky-400' :
        quest.category === 'energy' ? 'bg-emerald-400' :
        'bg-green-500'
      }`} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${categoryColors[quest.category]} border`}>
            <CategoryIcon className="w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className={difficultyColors[quest.difficulty]}>
              {quest.difficulty}
            </Badge>
            {isPending && (
              <Badge variant="outline" className="bg-secondary text-secondary-foreground border-border">
                Pending Review
              </Badge>
            )}
            {isCompleted && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Complete
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="font-display text-lg mt-3">{quest.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {quest.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <TreeDeciduous className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">+{quest.forestGrowth}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Leaf className="w-4 h-4" />
              <span>{quest.co2Impact}kg CO₂</span>
            </div>
          </div>
        </div>

        {!isCompleted && !isPending && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="default">
                Start Quest
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">{quest.title}</DialogTitle>
                <DialogDescription>
                  Complete this quest and submit proof for verification. Your forest will grow once approved!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="proof-image">Upload Photo Proof</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="proof-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="proof-image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Proof preview"
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">Click to upload image</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proof-text">Describe what you did</Label>
                  <Textarea
                    id="proof-text"
                    placeholder="Tell us about your environmental action..."
                    value={proofText}
                    onChange={(e) => setProofText(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!proofText.trim()}>
                  Submit for Verification
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {isPending && (
          <Button className="w-full" variant="outline" disabled>
            Awaiting Verification
          </Button>
        )}

        {isCompleted && (
          <Button className="w-full" variant="secondary" disabled>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Quest Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestCard;
