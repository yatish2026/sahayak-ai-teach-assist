import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, ArrowLeft, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const gameCategories = [
  {
    id: 1,
    title: "Math Adventures",
    description: "Practice addition, subtraction, and multiplication",
    icon: "🔢",
    difficulty: "Easy",
    bestScore: 85
  },
  {
    id: 2,
    title: "Science Explorer",
    description: "Learn about plants, animals, and nature",
    icon: "🔬",
    difficulty: "Medium",
    bestScore: 92
  },
  {
    id: 3,
    title: "Word Wizard",
    description: "Build vocabulary and spelling skills",
    icon: "📝",
    difficulty: "Easy",
    bestScore: 78
  }
];

export const LearningGames = () => {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const navigate = useNavigate();

  const startGame = (game: any) => {
    setSelectedGame(game);
    setGameActive(true);
    setCurrentScore(0);
  };

  const finishGame = () => {
    setGameActive(false);
    // Simulate score
    const finalScore = Math.floor(Math.random() * 30) + 70;
    setCurrentScore(finalScore);
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
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🎮 Learning Games</CardTitle>
            <p className="text-muted-foreground">Play educational games designed for your grade level</p>
          </CardHeader>
        </Card>

        {!selectedGame ? (
          <div className="grid gap-4">
            {gameCategories.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{game.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{game.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{game.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {game.difficulty}
                          </span>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-muted-foreground">Best: {game.bestScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => startGame(game)}
                      className="bg-gradient-primary"
                    >
                      Play Game
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
                <span className="text-2xl">{selectedGame.icon}</span>
                {selectedGame.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {gameActive ? (
                <div className="text-center py-12">
                  <div className="animate-pulse mb-4">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold mb-2">Game in Progress...</h3>
                    <p className="text-muted-foreground">Answer the questions to score points!</p>
                  </div>
                  <Button onClick={finishGame} className="bg-gradient-primary">
                    Finish Game
                  </Button>
                </div>
              ) : currentScore > 0 ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Star className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
                    <div className="text-4xl font-bold text-primary mb-2">{currentScore}%</div>
                    <p className="text-muted-foreground">
                      {currentScore >= selectedGame.bestScore ? "New Best Score! 🎉" : "Great job! Keep practicing!"}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={() => setSelectedGame(null)}>
                      Back to Games
                    </Button>
                    <Button onClick={() => startGame(selectedGame)} className="bg-gradient-primary">
                      Play Again
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">{selectedGame.description}</p>
                  <Button onClick={() => setGameActive(true)} className="bg-gradient-primary">
                    Start Game
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};