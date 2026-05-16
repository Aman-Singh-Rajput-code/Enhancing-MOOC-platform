import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { recommendFromJD,analyzeJobDescription } from "@/services/jobDescriptionApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CourseCard } from "@/components/courses/CourseCard";
import { Briefcase, Loader2, AlertCircle, Sparkles } from "lucide-react";
import type { JDRecommendResponse } from "@/types/job-description";

export default function JobDescriptionRecommender() {
  const [jd, setJd] = useState("");
  const [topN, setTopN] = useState(5);
  const [result, setResult] = useState<JDRecommendResponse | null>(null);
  const [analysis, setAnalysis] = useState(null);

  const mutation = useMutation({
    mutationFn: () => recommendFromJD(jd, topN),
    onSuccess: (data) => setResult(data),
  });
  const analysisMutation = useMutation({
  mutationFn: () => analyzeJobDescription(jd),
  onSuccess: (data) => setAnalysis(data.analysis),
});

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Job Description Recommender
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Paste a job description to find courses that match the required skills.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Enter Job Description
          </CardTitle>
          <CardDescription>We'll analyze the JD and recommend matching courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label>Job Description</Label>
    <span className="text-xs text-muted-foreground">{jd.trim().length} characters</span>
  </div>

  <Textarea
    placeholder="Paste the full job description here..."
    rows={8}
    value={jd}
    onChange={(e) => setJd(e.target.value)}
  />

  {/* ✅ Add this here */}
  {jd.trim().length > 0 && jd.trim().length < 30 && (
    <p className="text-xs text-destructive">
      Please enter at least 30 characters
    </p>
  )}
</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Number of recommendations</Label>
              <span className="text-sm font-medium">{topN}</span>
            </div>
            <Slider
              value={[topN]}
              onValueChange={([v]) => setTopN(v)}
              min={1}
              max={20}
              step={1}
            />
          </div>

          <Button
            onClick={async () => {
            try {
                const analysisData = await analysisMutation.mutateAsync();
                setAnalysis(analysisData.analysis);
                mutation.mutate();
              } catch (err) {
                console.error(err);
              }
            }}
            disabled={jd.trim().length < 30 || mutation.isPending || analysisMutation.isPending}
            className="w-full gap-2"
          >
            {mutation.isPending || analysisMutation.isPending ?  (
              <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Get Recommendations</>
            )}
          </Button>

          {mutation.isError && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md p-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {mutation.error?.message || "Failed to analyze. Make sure the JD API is running."}
            </div>
          )}
        </CardContent>
      </Card>
          {analysis && (
  <Card>
    <CardHeader>
      <CardTitle className="text-base flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        JD Insights
      </CardTitle>
      <CardDescription>
        Extracted information from the job description
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-3">
      <p className="text-sm">
        <b>Experience Level:</b> {analysis.experience_level}
      </p>

      <div>
  <b className="text-sm">Skills:</b>
  <div className="flex flex-wrap gap-2 mt-1">
    {analysis?.skills && analysis.skills.length > 0 ? (
      analysis.skills.map((skill: string, i: number) => (
        <span
          key={i}
          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
        >
          {skill}
        </span>
      ))
    ) : (
      <span className="text-xs text-muted-foreground">No skills found</span>
    )}
  </div>
</div>

      <p className="text-sm">
        <b>Domains:</b> {analysis?.domains?.join(", ") || "N/A"}
      </p>
    </CardContent>
  </Card>
)}
      {result && result.recommendations.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Matching Courses ({result.total})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.recommendations.map((course, i) => {
  const adaptedCourse = {
    course_name: course.course_name,
    instructor: course.instructor,
    rating: course.rating,
    platform: course.platform,
    is_paid: "Unknown",
    enrolled: 0,
    course_url: course.course_url,
    match_percentage: course.match_percentage,
    match_reasons: course.match_reasons,
  };

  return <CourseCard key={i} course={adaptedCourse} />;
})}
          </div>
        </div>
      )}
    </div>
  );
}
