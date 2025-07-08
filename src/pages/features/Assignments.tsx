import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, ArrowLeft, CheckCircle, Clock, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockAssignments = [
  {
    id: 1,
    title: "Water Cycle Worksheet",
    subject: "Science",
    dueDate: "2024-01-15",
    status: "pending",
    description: "Complete the worksheet about the water cycle process",
    type: "worksheet"
  },
  {
    id: 2,
    title: "Math Practice Problems",
    subject: "Mathematics", 
    dueDate: "2024-01-12",
    status: "submitted",
    description: "Solve addition and subtraction problems",
    type: "practice",
    submittedAnswer: "I completed all 10 problems and got 8 correct answers."
  },
  {
    id: 3,
    title: "Reading Comprehension",
    subject: "English",
    dueDate: "2024-01-18",
    status: "pending",
    description: "Read the story and answer questions about the main character",
    type: "reading"
  }
];

export const Assignments = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const submitAssignment = () => {
    if (!answer.trim()) return;
    
    setAssignments(assignments.map(assignment => 
      assignment.id === selectedAssignment.id 
        ? { ...assignment, status: "submitted", submittedAnswer: answer }
        : assignment
    ));
    setSelectedAssignment(null);
    setAnswer("");
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">📝 Assignments</CardTitle>
            <p className="text-muted-foreground">Complete assignments given by your teacher</p>
          </CardHeader>
        </Card>

        {!selectedAssignment ? (
          <div className="grid gap-4">
            {assignments.map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);
              return (
                <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{assignment.title}</h3>
                          {assignment.status === "submitted" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {assignment.subject}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            assignment.status === "submitted" 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : daysUntilDue <= 1 
                                ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                          }`}>
                            {assignment.status === "submitted" 
                              ? "Submitted"
                              : daysUntilDue <= 0 
                                ? "Overdue"
                                : `Due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}`
                            }
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedAssignment(assignment)}
                        variant={assignment.status === "submitted" ? "outline" : "default"}
                        className={assignment.status === "pending" ? "bg-gradient-primary" : ""}
                      >
                        {assignment.status === "submitted" ? "View Submission" : "Start Assignment"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-6 h-6" />
                {selectedAssignment.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedAssignment.subject} | Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Assignment Instructions:</h4>
                <p className="text-sm">{selectedAssignment.description}</p>
              </div>
              
              {selectedAssignment.status === "submitted" ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Assignment Submitted</h4>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2">Your Answer:</p>
                  <p className="text-sm bg-white dark:bg-green-950/50 p-3 rounded border">
                    {selectedAssignment.submittedAnswer}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="assignment-answer" className="block text-sm font-medium mb-2">
                      Your Answer:
                    </label>
                    <Textarea
                      id="assignment-answer"
                      placeholder="Type your answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                      Back to Assignments
                    </Button>
                    <Button 
                      onClick={submitAssignment}
                      disabled={!answer.trim()}
                      className="bg-gradient-primary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Assignment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};