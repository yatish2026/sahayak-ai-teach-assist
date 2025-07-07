import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StoryGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const generateStory = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setStory(`Once upon a time in our village, ${prompt}. The children learned valuable lessons about friendship and community, understanding that every person has a unique role to play in making their surroundings better.`);
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
            Back to Home
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Book className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Hyper-Local Story Generator</CardTitle>
            <p className="text-muted-foreground">Create culturally relevant stories in your local language</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="story-prompt">Describe the story you want (in your local language)</Label>
              <Textarea
                id="story-prompt"
                placeholder="Example: Create a story about farmers to explain soil types in Marathi"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={generateStory} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-primary"
            >
              {isGenerating ? "Generating Story..." : "Generate Story"}
            </Button>
          </CardContent>
        </Card>

        {story && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="leading-relaxed">{story}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Save Story</Button>
                <Button variant="outline" size="sm">Share with Students</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};