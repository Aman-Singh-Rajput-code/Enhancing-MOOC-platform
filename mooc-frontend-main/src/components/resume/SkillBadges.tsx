import { Badge } from "@/components/ui/badge";

interface SkillBadgesProps {
  skills?: string[]; // ✅ make optional
  max?: number;
}

export function SkillBadges({ skills = [], max = 20 }: SkillBadgesProps) {
  const shown = skills.slice(0, max);
  const remaining = skills.length - max;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((skill) => (
        <Badge key={skill} variant="secondary" className="text-xs">
          {skill}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-xs text-muted-foreground">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
}