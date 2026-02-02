import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 text-center">
      <Badge variant="secondary" className="mb-4 px-3 py-1.5">
        Build Your Perfect Routine
      </Badge>

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
        Welcome to FitBuilder
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
        Create personalized workout routines, track your progress, and achieve your fitness goals.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/exercises">Browse Exercises</Link>
        </Button>

        <Button size="lg" variant="outline" asChild>
          <Link href="/routines">Create Routine</Link>
        </Button>
      </div>
    </section>
  );
}
