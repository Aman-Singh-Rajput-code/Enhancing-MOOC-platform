import { API_CONFIG } from "@/config/api";
import type { JDAnalyzeResponse, JDRecommendResponse } from "@/types/job-description";

const BASE = API_CONFIG.JOB_DESCRIPTION_API;

export async function analyzeJobDescription(jobDescription: string): Promise<JDAnalyzeResponse> {
  const res = await fetch(`${BASE}/analyze-job-description`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_description: jobDescription }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Analysis failed");
  }
  return res.json();
}

export async function recommendFromJD(jobDescription: string, topN = 5): Promise<JDRecommendResponse> {
  const res = await fetch(`${BASE}/recommend-courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_description: jobDescription, top_n: topN }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Recommendation failed");
  }
  return res.json();
}

export async function getJDApiStats() {
  const res = await fetch(`${BASE}/api/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
