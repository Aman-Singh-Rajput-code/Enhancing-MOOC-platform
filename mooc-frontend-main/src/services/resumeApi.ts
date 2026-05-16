import { API_CONFIG } from "@/config/api";
import type { ResumeUploadResponse } from "@/types/resume";
import type { CourseStats } from "@/types/course";

const BASE = API_CONFIG.RESUME_API;

export async function uploadResume(file: File): Promise<ResumeUploadResponse> {
  const formData = new FormData();
  formData.append("resume", file);
  const res = await fetch(`${BASE}/upload`, { method: "POST", body: formData });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Upload failed");
  }
  return res.json();
}

export async function getResumeApiStats(): Promise<CourseStats> {
  const res = await fetch(`${BASE}/api/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function searchCourses(query: string, limit = 10) {
  const res = await fetch(`${BASE}/api/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function getAllCourses() {
  const res = await fetch(`${BASE}/api/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function getCourseById(courseId: string) {
  const res = await fetch(`${BASE}/api/course/${courseId}`);
  if (!res.ok) throw new Error("Course not found");
  return res.json();
}
