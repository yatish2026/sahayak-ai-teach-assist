import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DramaScripts = () => {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const generateScript = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setScript({
        title: `Drama Script: ${topic}`,
        characters: ["Narrator", "Ravi (Student)", "Priya (Student)", "Teacher", "Village Elder"],
        scenes: [
          {
            scene: "Scene 1: The Problem",
            dialogue: [
              "Narrator: In the village of Greenfield, water was being wasted every day...",
              "Ravi: Look! The tap is running and no one is using it!",
              "Priya: We learned in school that water is precious. We must do something!"
            ]
          },
          {
            scene: "Scene 2: The Solution",
            dialogue: [
              "Teacher: Children, what can we do to save water?",
              "Ravi: We can turn off taps when not in use!",
              "Priya: We can collect rainwater for plants!",
              "Village Elder: You children are wise. Let's work together!"
            ]
          }
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-lg flex items-center justify-center">
              <School className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Drama & Roleplay Scripts</CardTitle>
            <p className="text-muted-foreground">Create engaging drama scripts and roleplay activities</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="topic-input">Enter Topic (e.g., Water Conservation)</Label>
              <Input
                id="topic-input"
                placeholder="Water Conservation, Tree Plantation, Cleanliness, etc."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={generateScript} 
              disabled={!topic.trim() || isGenerating}
              className="w-full bg-gradient-primary"
            >
              {isGenerating ? "Generating Script..." : "Generate Script"}
            </Button>
          </CardContent>
        </Card>

        {script && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                {script.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Characters:</h4>
                <div className="flex flex-wrap gap-2">
                  {script.characters.map((character: string, index: number) => (
                    <span key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                      {character}
                    </span>
                  ))}
                </div>
              </div>
              
              {script.scenes.map((scene: any, index: number) => (
                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">{scene.scene}</h4>
                  <div className="space-y-2">
                    {scene.dialogue.map((line: string, idx: number) => (
                      <p key={idx} className="text-sm leading-relaxed">
                        <span className="font-medium">{line.split(':')[0]}:</span>
                        <span className="ml-2">{line.split(':').slice(1).join(':')}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="bg-gradient-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📹 Animated Preview Available</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Short animated video preview of the scene generated for classroom demonstration
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Download Script</Button>
                  <Button variant="outline" size="sm">Download Images</Button>
                  <Button variant="outline" size="sm">View Animation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};