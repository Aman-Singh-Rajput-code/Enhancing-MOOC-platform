export interface JDAnalysis {
  skills: string[];
  experience_level: string;
  domains: string[];
  [key: string]: unknown;
}

export interface JDRecommendation {
  course_name: string;
  platform: string;
  instructor: string;
  rating: number;
  match_percentage: number;
  course_url: string;
  match_reasons?: string[]; // ADD THIS
}

export interface JDAnalyzeResponse {
  success: boolean;
  analysis: JDAnalysis;
}

export interface JDRecommendResponse {
  success: boolean;
  recommendations: JDRecommendation[];
  total: number;
}
