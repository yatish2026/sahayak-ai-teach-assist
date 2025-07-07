import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SpeakingCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Stop recording and analyze
      analyzeSpeech();
    }
  };

  const analyzeSpeech = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setFeedback({
        pronunciation: 85,
        clarity: 78,
        confidence: 90,
        suggestions: [
          "Great job on pronunciation! Try to speak a bit slower for better clarity.",
          "Your confidence level is excellent. Keep practicing to maintain this energy.",
          "Focus on clear articulation of consonants."
        ]
      });
      setIsAnalyzing(false);
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
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Speaking Coach - Vaani Saathi</CardTitle>
            <p className="text-muted-foreground">Practice speaking with AI-powered feedback</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
                {isRecording ? (
                  <MicOff className="w-16 h-16 text-primary animate-pulse" />
                ) : (
                  <Mic className="w-16 h-16 text-primary" />
                )}
              </div>
              
              <Button 
                onClick={toggleRecording}
                disabled={isAnalyzing}
                className={`w-full max-w-sm ${isRecording ? 'bg-destructive' : 'bg-gradient-primary'}`}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              
              {isRecording && (
                <p className="mt-2 text-sm text-muted-foreground animate-pulse">
                  Recording... Speak clearly into your microphone
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {feedback && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🎤 Speech Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Speech Transcript:</h4>
                  <div className="bg-muted/50 p-3 rounded text-sm italic">
                    "Hello, my name is [Student Name]. Today I want to talk about water conservation..."
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{feedback.pronunciation}%</div>
                    <div className="text-sm text-muted-foreground">Pronunciation Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{feedback.clarity}%</div>
                    <div className="text-sm text-muted-foreground">Clarity Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{feedback.confidence}%</div>
                    <div className="text-sm text-muted-foreground">Confidence Score</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">💡 Suggestions for Improvement</h4>
                  <ul className="space-y-2">
                    {feedback.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Save Progress</Button>
                  <Button variant="outline" size="sm">Try Again</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🏆 Speaking Leaderboard</CardTitle>
                <p className="text-sm text-muted-foreground">Top 5 students based on recent speaking scores</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Priya Singh", score: 92, message: "Excellent pronunciation!" },
                    { name: "Rahul Sharma", score: 88, message: "Great confidence level!" },
                    { name: "Amit Kumar", score: 85, message: "Clear and steady speech!" },
                    { name: "Sunita Devi", score: 82, message: "Good improvement!" },
                    { name: "Ravi Patel", score: 79, message: "Keep practicing!" }
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.message}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{student.score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};