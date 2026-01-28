import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            React + TypeScript + Tailwind CSS + shadcn/ui
          </p>
          <p className="text-sm text-muted-foreground">
            A modern, production-ready starter template
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Next.js 16</CardTitle>
              <CardDescription>
                Latest App Router with server components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Blazing-fast React framework with built-in optimization and routing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 shadcn/ui</CardTitle>
              <CardDescription>
                Beautiful, accessible components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Customizable components built with Radix UI and Tailwind CSS.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔷 TypeScript</CardTitle>
              <CardDescription>
                Type-safe development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Catch errors early with static type checking and better IDE support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Tailwind CSS</CardTitle>
              <CardDescription>
                Utility-first styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build modern UIs quickly with responsive utility classes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📦 ESLint</CardTitle>
              <CardDescription>
                Code quality tooling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Maintain code quality with pre-configured linting rules.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🚀 Ready to Deploy</CardTitle>
              <CardDescription>
                Production optimized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimized build with automatic code splitting and lazy loading.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Example Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>
              Demonstrating shadcn/ui components in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <Button type="submit" className="w-full">
                Get Started
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>🎉 Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Development Server:</h3>
                <code className="block bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                  npm run dev
                </code>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Add More Components:</h3>
                <code className="block bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                  npx shadcn@latest add [component-name]
                </code>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Edit This Page:</h3>
                <code className="block bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
                  src/app/page.tsx
                </code>
              </div>
              <div className="pt-4 flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                    Next.js Docs
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                    shadcn/ui Docs
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
