import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { API_CONFIG } from "@/config/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillBadges } from "@/components/resume/SkillBadges";
import { CourseCard } from "@/components/courses/CourseCard";
import { Upload, FileText, Loader2, AlertCircle, GraduationCap, Briefcase } from "lucide-react";
import type { ResumeUploadResponse } from "@/types/resume";

export default function ResumeRecommender() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<ResumeUploadResponse | null>(null);
  const [error, setError] = useState("");

  // ✅ UPDATED MUTATION (ML LOGIC INTEGRATED)
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(`${API_CONFIG.RESUME_API}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Something went wrong.");
      }

      return data;
    },

    onSuccess: (data) => {
  console.log("FULL API RESPONSE:", data);

  setResult({
    ...data,
    courses: data.recommendations,              // 👈 map this
    total: data.total_recommendations,          // 👈 map this
  });

  setError("");
},

    onError: (err: any) => {
      setError(err.message || "Failed to process resume.");
    },
  });

  const handleFile = (f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (ext === "pdf" || ext === "docx") {
      setFile(f);
      setResult(null);
      setError("");
    } else {
      setError("Only PDF or DOCX files are allowed.");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleSubmit = () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }
    mutation.mutate(file);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Resume Recommender
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Upload your resume to get AI-powered course recommendations.
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium">Drag & drop your resume here</p>
            <p className="text-xs text-muted-foreground mt-1">PDF or DOCX, max 16MB</p>
            <div className="mt-4">
              <label>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <Button variant="outline" size="sm" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
            </div>
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between rounded-md bg-muted p-3">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">{file.name}</span>
                <span className="text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
              </div>
              <Button size="sm" onClick={handleSubmit} disabled={mutation.isPending} className="gap-1.5">
                {mutation.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                {mutation.isPending ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </div>
          )}

          {/* ✅ UPDATED ERROR HANDLING */}
          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md p-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Resume Analysis
              </CardTitle>
              <CardDescription>
                We found {result?.analysis?.skill_count || 0} skills · {result?.analysis?.experience_level || "N/A"} level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Skills Detected
                </p>
                <SkillBadges skills={result?.analysis?.skills || []} />
              </div>

              {(result.analysis.domains || []).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Domains
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(result.analysis.domains || []).map((d) => (
                      <Badge key={d} variant="outline">{d}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {(result.analysis.education || []).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Education
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(result.analysis.education || []).map((e) => (
                      <Badge key={e} variant="outline">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {e}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div>
  <h2 className="text-lg font-bold mb-4">
    Recommended Courses ({result?.total || 0})
  </h2>

  {result?.courses?.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {result.courses.map((course, i) => (
        <CourseCard key={i} course={course} />
      ))}
    </div>
  ) : (
    <p className="text-sm text-muted-foreground">
      No recommendations found.
    </p>
  )}
</div>
        </>
      )}
    </div>
  );
}