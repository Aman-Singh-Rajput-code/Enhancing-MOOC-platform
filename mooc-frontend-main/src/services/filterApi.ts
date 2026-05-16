import { API_CONFIG } from "@/config/api";
import type { FilterRequest, FilterResponse } from "@/types/course";

const BASE = API_CONFIG.FILTER_API;

export async function filterCourses(filters: FilterRequest): Promise<FilterResponse> {
  const res = await fetch(`${BASE}/filter-courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Filter failed");
  }

  const data = await res.json();

  // 🔥 TRANSFORM API RESPONSE → UI FORMAT
  const transformedResults = (data.results || []).map((course: any) => ({
    course_id: course.course_id || course.course_name,
    course_name: course.course_name,
    instructor: course.instructor,
    rating: course.course_rating ?? null,
    platform: course.platform,
    is_paid: course.is_paid,
    enrolled: course.enrollment,
    match_percentage: Math.round((course.final_score || 0) * 100),

    // optional enhancements
    match_reasons: [
      `Sentiment score: ${course.sentiment_score ?? "N/A"}`,
    ],

    course_url: course.course_url,
  }));

  return {
    success: true,
    sentiment: data.sentiment?.label || data.sentiment || "unknown",
    results: transformedResults,
    total: data.results?.length || 0,
  };
}
