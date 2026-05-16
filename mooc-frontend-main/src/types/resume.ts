export interface ResumeAnalysis {
  skills: string[];
  skill_count: number;
  experience_level: string;
  domains: string[];
  education: string[];
}

export interface ResumeUploadResponse {
  analysis: {
    domains: string[];
    education: string[];
    experience_level: string;
    skill_count: number;
    skills: string[];
  };
  courses: any[]; // or define proper type
  total: number;
  success: boolean;
}
