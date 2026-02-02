import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-5 w-5 mt-1" />
        <h1 className="text-2xl font-bold">FitBuilder</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}
