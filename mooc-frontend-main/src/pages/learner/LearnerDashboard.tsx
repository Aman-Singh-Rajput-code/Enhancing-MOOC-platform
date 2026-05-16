import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, BookOpen, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Resume Recommender",
    description: "Upload your resume and get personalized course recommendations based on your skills and experience.",
    icon: FileText,
    to: "/resume", // ✅ FIXED
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Job Description Match",
    description: "Paste a job description to find courses that bridge your skill gaps for that role.",
    icon: Briefcase,
    to: "/job-description", // ✅ FIXED
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Browse & Filter Courses",
    description: "Explore the full course catalog with smart filters for rating, price, and relevance.",
    icon: BookOpen,
    to: "/courses", // ✅ FIXED
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export default function LearnerDashboard() {
  // ✅ Replace useRole with localStorage
  const userName = localStorage.getItem("username") || "User";

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Welcome back, {userName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Find the perfect courses to advance your career.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link key={f.to} to={f.to} className="group">
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-3">
                <div className={`rounded-lg ${f.bg} p-2.5 w-fit`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-base flex items-center gap-2">
                  {f.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {f.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}