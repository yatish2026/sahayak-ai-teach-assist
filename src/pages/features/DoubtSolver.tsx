import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, ArrowLeft, Mic, Send, ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  hasAudio?: boolean;
  hasDiagram?: boolean;
}

export const DoubtSolver = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: "👋 नमस्ते! I'm your AI doubt solver. Ask me anything in English or Hindi!",
      hasAudio: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: generateResponse(inputValue),
        hasAudio: true,
        hasDiagram: inputValue.toLowerCase().includes('evaporation') || inputValue.toLowerCase().includes('water cycle')
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const generateResponse = (question: string) => {
    if (question.toLowerCase().includes('evaporation')) {
      return `🌊 **Evaporation (वाष्पीकरण)** is when water changes from liquid to gas!

**Simple Explanation:**
When the sun heats water in rivers, lakes, or oceans, the water becomes invisible water vapor and rises into the sky.

**Example:** जब आप चाय बनाते हैं और steam निकलता है - that's evaporation!

**Why it happens:**
- Sun gives energy (heat) ☀️
- Water molecules move faster 💨
- They escape into air as vapor 🌫️`;
    }

    return `I understand your question! Let me explain step by step:

**Answer:** This is a great question about learning concepts.

**Explanation:** 
1. First, let's break down the main idea
2. Then we'll look at examples
3. Finally, we'll practice together

Would you like me to explain this in Hindi or show you a diagram?`;
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
              <Bot className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🤖 AI Doubt Solver</CardTitle>
            <p className="text-muted-foreground">
              Get instant answers with voice explanations and visual diagrams
            </p>
          </CardHeader>
        </Card>

        <Card className="h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Chat with AI Teacher
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                        {message.hasAudio && (
                          <Button size="sm" variant="ghost" className="h-8 px-2">
                            <Volume2 className="w-3 h-3 mr-1" />
                            Listen
                          </Button>
                        )}
                        {message.hasDiagram && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 bg-blue-50">
                            🖼️ View Diagram
                          </Button>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your doubt in English or Hindi..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" variant="outline">
                <Mic className="w-4 h-4" />
              </Button>
              <Button onClick={handleSendMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Doubts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">💡 Sample Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "What is evaporation?",
                "How do plants make food?",
                "वाष्पीकरण क्या है?",
                "3 + 5 कैसे करते हैं?"
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => setInputValue(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};