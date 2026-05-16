import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { filterCourses } from "@/services/filterApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CourseCard } from "@/components/courses/CourseCard";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, AlertCircle, SlidersHorizontal } from "lucide-react";
import type { FilterResponse } from "@/types/course";

export default function BrowseCourses() {
  const [query, setQuery] = useState("");
  const [isPaid, setIsPaid] = useState("any");
  const [minRating, setMinRating] = useState(4.0);
  const [topN, setTopN] = useState(10);
  const [result, setResult] = useState<FilterResponse | null>(null);

  const mutation = useMutation({
    mutationFn: () => filterCourses({ query: query.trim().toLowerCase(), is_paid: isPaid.toLowerCase(), min_rating: minRating, top_n: topN }),
    onSuccess: (data) => {
  console.log("FILTER RESPONSE:", data);
  setResult(data);
}
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) mutation.mutate();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Browse & Filter Courses
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Search and filter from the course catalog with AI-powered sentiment analysis.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search courses, topics, or skills..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={!query.trim() || mutation.isPending} className="gap-1.5">
                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Search
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Price</Label>
                <Select value={isPaid} onValueChange={setIsPaid}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Min Rating</Label>
                  <span className="text-xs text-muted-foreground">{minRating.toFixed(1)}</span>
                </div>
                <Slider value={[minRating]} onValueChange={([v]) => setMinRating(Number(v))} min={0} max={5} step={0.5} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Results</Label>
                  <span className="text-xs text-muted-foreground">{topN}</span>
                </div>
                <Slider value={[topN]} onValueChange={([v]) => setTopN(v)} min={5} max={50} step={5} />
              </div>
            </div>
          </form>

          {mutation.isError && (
            <div className="mt-4 flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md p-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {mutation.error?.message || "Filter failed. Make sure the Filter API is running."}
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Results ({result.total})
            </h2>
            {result.sentiment && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                {result.sentiment === "positive"
                  ? "😊 Positive"
                  : result.sentiment === "negative"
                  ? "😡 Negative"
                  : "😐 Neutral"}
              </Badge>
            )}
          </div>
          {result.results?.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.results.map((course, i) => (
                <CourseCard key={i} course={course} showMatch={true} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No courses found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}
