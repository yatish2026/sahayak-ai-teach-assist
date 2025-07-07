import { FeatureCard } from "./FeatureCard";
import { 
  Book, BookOpen, Camera, ChartBar, 
  GraduationCap, Image, School 
} from "lucide-react";

const features = [
  {
    title: "Hyper-Local Story Generator",
    description: "Create culturally relevant stories and explanations in local languages using AI",
    icon: Book,
    category: "Content" as const
  },
  {
    title: "Worksheet Generator",
    description: "Upload textbook photos and generate differentiated worksheets for multiple grades",
    icon: Camera,
    category: "AI" as const
  },
  {
    title: "Visual Aid Creator",
    description: "Generate blackboard-friendly diagrams and visual learning materials",
    icon: Image,
    category: "Content" as const
  },
  {
    title: "Student Progress Tracker",
    description: "Monitor individual student performance and identify learning gaps with AI insights",
    icon: ChartBar,
    category: "Assessment" as const
  },
  {
    title: "Lesson Plan Generator",
    description: "Auto-generate weekly lesson plans based on your curriculum and syllabus",
    icon: BookOpen,
    category: "Teacher" as const
  },
  {
    title: "Drama & Roleplay Scripts",
    description: "Create engaging drama scripts and roleplay activities for various topics",
    icon: School,
    category: "Content" as const
  },
  {
    title: "Speaking Coach (Vaani Saathi)",
    description: "AI-powered pronunciation and speaking practice with real-time feedback",
    icon: GraduationCap,
    category: "Student" as const
  },
  {
    title: "Learning Gap Detector",
    description: "Advanced AI analysis to identify and address individual learning challenges", 
    icon: School,
    category: "Assessment" as const,
    comingSoon: true
  }
];

export const FeaturesGrid = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful AI Features for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Modern Education
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select what you'd like to do today. Your AI companion is ready to help transform your classroom experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                category={feature.category}
                comingSoon={feature.comingSoon}
                onClick={() => {
                  console.log(`Opening ${feature.title}`);
                  const featurePaths: { [key: string]: string } = {
                    "Hyper-Local Story Generator": "/features/story-generator",
                    "Worksheet Generator": "/features/worksheet-generator",
                    "Speaking Coach (Vaani Saathi)": "/features/speaking-coach"
                  };
                  
                  const path = featurePaths[feature.title];
                  if (path) {
                    window.location.href = path;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};