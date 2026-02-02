"use client";

import { Button } from "@/components/ui/button";
import { Dumbbell, X } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

export function Header() {
  const [showAuthPrompt, setShowAuthPrompt] = useState(true);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 mt-1" />
          <h1 className="text-2xl font-bold">FitBuilder</h1>
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Guest Mode Banner */}
      <SignedOut>
        {showAuthPrompt && (
          <div className="bg-muted border-b px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-medium">
                  You're using FitBuilder as a guest
                </p>
                <p className="text-xs text-muted-foreground">
                  Your routines are saved locally. Sign up to sync across devices and keep your data safe.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SignUpButton mode="modal">
                <Button size="sm" variant="default">
                  Create Free Account
                </Button>
              </SignUpButton>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAuthPrompt(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </SignedOut>
    </>
  );
}
