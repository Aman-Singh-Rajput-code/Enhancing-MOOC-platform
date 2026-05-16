import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, ExternalLink } from "lucide-react";
import type { CourseRecommendation } from "@/types/course";

interface CourseCardProps {
  course: CourseRecommendation;
  showMatch?: boolean;
}

export function CourseCard({ course, showMatch = false }: CourseCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="flex-1 p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {course.course_name}
          </h3>
          {showMatch && course.match_percentage && course.match_percentage > 0 && (
            <Badge variant="default" className="shrink-0 text-xs">
              {Math.round(course.match_percentage)}%
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground">{course.instructor}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">{course.platform}</Badge>
          {course.is_paid && (
            <Badge variant="secondary" className="text-xs">
              {course.is_paid === "True" ? "Paid" : "Free"}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {course.rating?.toFixed(1) || "N/A"}
          </span>
          {course.enrolled !== undefined && course.enrolled > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {course.enrolled.toLocaleString()}
            </span>
          )}
        </div>

        {course.match_reasons && course.match_reasons.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {course.match_reasons.slice(0, 3).map((reason, i) => (
              <span key={i} className="text-[10px] bg-primary/5 text-primary rounded px-1.5 py-0.5">
                {reason}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      {course.course_url && (
        <CardFooter className="p-5 pt-0">
          <Button variant="outline" size="sm" className="w-full gap-1.5" asChild>
            <a href={course.course_url} target="_blank" rel="noopener noreferrer">
              View Course <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
