import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, ArrowLeft, Eye, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const visualAids = [
  {
    id: 1,
    title: "Water Cycle Diagram",
    subject: "Science",
    type: "Diagram",
    description: "Interactive diagram showing evaporation, condensation, and precipitation",
    viewed: false,
    hasVideo: true
  },
  {
    id: 2,
    title: "Plant Parts Chart",
    subject: "Science",
    type: "Chart",
    description: "Detailed chart showing roots, stem, leaves, and flowers",
    viewed: true,
    hasVideo: false
  },
  {
    id: 3,
    title: "Number Line Visual",
    subject: "Mathematics",
    type: "Interactive",
    description: "Visual number line for addition and subtraction practice",
    viewed: false,
    hasVideo: true
  }
];

export const VisualLearning = () => {
  const [aids, setAids] = useState(visualAids);
  const [selectedAid, setSelectedAid] = useState<any>(null);
  const navigate = useNavigate();

  const markAsViewed = (aidId: number) => {
    setAids(aids.map(aid => 
      aid.id === aidId ? { ...aid, viewed: true } : aid
    ));
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
              <Image className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🖼️ Visual Learning</CardTitle>
            <p className="text-muted-foreground">Explore interactive diagrams and visual aids</p>
          </CardHeader>
        </Card>

        {!selectedAid ? (
          <div className="grid gap-4">
            {aids.map((aid) => (
              <Card key={aid.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{aid.title}</h3>
                          {aid.viewed && <Eye className="w-4 h-4 text-green-500" />}
                          {aid.hasVideo && <Play className="w-4 h-4 text-blue-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{aid.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {aid.subject}
                          </span>
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                            {aid.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedAid(aid)}
                      variant={aid.viewed ? "outline" : "default"}
                      className={!aid.viewed ? "bg-gradient-primary" : ""}
                    >
                      {aid.viewed ? "View Again" : "Explore"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-6 h-6" />
                {selectedAid.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{selectedAid.subject} | {selectedAid.type}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <Image className="w-32 h-32 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">{selectedAid.description}</p>
                {selectedAid.hasVideo && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Play className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Interactive Video Available
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Watch the animated explanation for better understanding
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedAid(null)}>
                  Back to Visual Aids
                </Button>
                {selectedAid.hasVideo && (
                  <Button variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Play Video
                  </Button>
                )}
                {!selectedAid.viewed && (
                  <Button 
                    onClick={() => {
                      markAsViewed(selectedAid.id);
                      setSelectedAid(null);
                    }}
                    className="bg-gradient-primary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Mark as Viewed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};