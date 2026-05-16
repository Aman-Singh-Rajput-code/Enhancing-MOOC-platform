export interface Course {
  course_id: string;
  course_name: string;
  instructor: string;
  course_rating: number;
  platform: string;
  is_paid: string;
  Number_of_student_enrolled: number;
  course_url: string;
  user_comments?: string;
}

export interface CourseRecommendation {
  course_id?: string;
  course_name: string;
  instructor: string;
  rating?: number | null; // ✅ safer
  platform: string;
  is_paid?: string | boolean; // ✅ handles both cases
  enrolled?: number;
  match_percentage: number;
  match_reasons?: string[];
  course_url?: string; // ✅ optional safety
  sources?: string[];
}

export interface CourseStats {
  total_courses: number;
  platforms: string[];
  average_rating: number;
  total_enrollment: number;
  paid_courses?: number;
  free_courses?: number;
}

export interface FilterRequest {
  query: string;
  is_paid?: string;
  min_rating?: number;
  top_n?: number;
}

export interface FilterResponse {
  success: boolean;
  sentiment: string;
  results: CourseRecommendation[];
  total: number;
}
