import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <section>
      <h1>Welcome to My Application</h1>

      <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
        <button>Get Started</button>
        <button>Learn More</button>
      </div>
    </section>
  );
}