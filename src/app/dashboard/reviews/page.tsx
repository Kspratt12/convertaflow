"use client";

import {
  Star,
  Send,
  CheckCircle2,
  Clock,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const reviewRequests = [
  { name: "Jennifer Adams", email: "jennifer@email.com", status: "Completed", rating: 5, date: "Apr 6, 2026" },
  { name: "Robert Kim", email: "robert@email.com", status: "Sent", rating: null, date: "Apr 5, 2026" },
  { name: "Sarah Mitchell", email: "sarah@email.com", status: "Completed", rating: 5, date: "Apr 4, 2026" },
  { name: "Carlos Reyes", email: "carlos@email.com", status: "Completed", rating: 4, date: "Apr 3, 2026" },
  { name: "Amanda Foster", email: "amanda@email.com", status: "Sent", rating: null, date: "Apr 2, 2026" },
  { name: "Marcus Chen", email: "marcus@email.com", status: "Completed", rating: 5, date: "Apr 1, 2026" },
  { name: "Lisa Park", email: "lisa@email.com", status: "Opened", rating: null, date: "Mar 31, 2026" },
  { name: "James Rodriguez", email: "james@email.com", status: "Completed", rating: 5, date: "Mar 30, 2026" },
];

const completed = reviewRequests.filter((r) => r.status === "Completed");
const avgRating =
  completed.reduce((sum, r) => sum + (r.rating || 0), 0) / completed.length;

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <p className="text-sm text-muted-foreground">
            Track review requests and build your reputation.
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Send Review Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Sent</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{reviewRequests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{completed.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Avg Rating</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{avgRating.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Completion Rate
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {Math.round((completed.length / reviewRequests.length) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = completed.filter(
                (r) => r.rating === rating
              ).length;
              const pct = (count / completed.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="flex w-12 items-center gap-1 text-sm">
                    {rating}{" "}
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </span>
                  <Progress value={pct} className="h-2 flex-1" />
                  <span className="w-8 text-right text-xs text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Review Requests List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Review Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">
                    Date Sent
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewRequests.map((req) => (
                  <tr
                    key={req.email}
                    className="border-b transition-colors hover:bg-muted/50 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{req.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {req.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          req.status === "Completed"
                            ? "default"
                            : req.status === "Opened"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {req.rating ? (
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: req.rating }).map((_, j) => (
                            <Star
                              key={j}
                              className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {req.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
