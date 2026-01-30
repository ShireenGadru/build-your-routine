import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-lg font-semibold">My App</h1>
      <Button variant="outline">Login</Button>
    </header>
  );
}
