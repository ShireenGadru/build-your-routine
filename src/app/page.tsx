"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Target, 
  Zap, 
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Home() {
  // Force dark mode on landing page
  useEffect(() => {
    document.documentElement.classList.add("dark");
    
    return () => {
      // Don't remove the dark class on unmount to maintain theme consistency
    };
  }, []);

  return (
    <div className="relative -mx-6 -mt-6">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/landing-bg-1.png)' }}
        />
        
        {/* Overlay - black with custom green tint */}
        <div className="absolute inset-0 bg-black/70" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            background: 'linear-gradient(135deg, rgba(83, 141, 78, 0.4), transparent 50%, rgba(83, 141, 78, 0.3))' 
          }}
        />
        
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-1/4 -right-48 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #7BC96F, transparent)' }}
        />
        <div 
          className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #538D4E, transparent)' }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 py-20">
          <div className="max-w-3xl">
            <Badge 
              className="mb-6 px-4 py-2 border inline-flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ 
                backgroundColor: 'rgba(83, 141, 78, 0.15)',
                color: '#7BC96F',
                borderColor: 'rgba(83, 141, 78, 0.3)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              Build Your Perfect Routine
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Transform Your Fitness Journey with{" "}
              <span 
                className="text-transparent bg-clip-text inline-block"
                style={{ 
                  backgroundImage: 'linear-gradient(120deg, #7BC96F, #538D4E, #7BC96F)',
                  backgroundSize: '200% auto',
                  animation: 'gradient 3s linear infinite'
                }}
              >
                FitBuilder
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Create personalized workout routines, track your progress in real-time, and achieve your fitness goals faster with AI-powered insights.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button 
                asChild 
                className="text-white border-0 shadow-lg shadow-green-900/50 hover:shadow-xl hover:shadow-green-900/60 transition-all duration-300"
                style={{ 
                  backgroundColor: '#538D4E',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#447038'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#538D4E'}
              >
                <Link href="/exercises" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button 
                variant="outline" 
                asChild
                className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
               
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Exercises</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-sm text-gray-400">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-linear-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <Badge 
              className="mb-4 px-4 py-2 border inline-block"
              style={{ 
                backgroundColor: 'rgba(83, 141, 78, 0.1)',
                color: '#7BC96F',
                borderColor: 'rgba(83, 141, 78, 0.3)'
              }}
            >
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you build, track, and optimize your fitness routine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Dumbbell,
                title: "Custom Workouts",
                description: "Build personalized routines tailored to your goals with our extensive exercise library"
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Plan your week with intelligent workout scheduling and rest day recommendations"
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Monitor your gains with detailed analytics and visual progress charts"
              },
              {
                icon: Target,
                title: "Goal Setting",
                description: "Set and achieve your fitness milestones with personalized goal tracking"
              },
              {
                icon: Zap,
                title: "Quick Workouts",
                description: "Access pre-built routines for when you're short on time but need results"
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Your data is encrypted and secure with automatic cloud backup"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(83, 141, 78, 0.2)',
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(83, 141, 78, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(83, 141, 78, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(83, 141, 78, 0.2)';
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(83, 141, 78, 0.2)' }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: '#7BC96F' }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <Badge 
              className="mb-4 px-4 py-2 border inline-block"
              style={{ 
                backgroundColor: 'rgba(83, 141, 78, 0.1)',
                color: '#7BC96F',
                borderColor: 'rgba(83, 141, 78, 0.3)'
              }}
            >
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your Journey in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-linear-to-r from-transparent via-green-900/50 to-transparent" />
            
            {[
              {
                step: "01",
                title: "Choose Your Goals",
                description: "Select your fitness objectives and preferences to get started"
              },
              {
                step: "02",
                title: "Build Your Routine",
                description: "Pick exercises from our library and create your perfect workout plan"
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Log workouts and watch your strength and endurance improve over time"
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold border-2 relative z-10"
                  style={{ 
                    backgroundColor: 'rgba(83, 141, 78, 0.1)',
                    color: '#7BC96F',
                    borderColor: 'rgba(83, 141, 78, 0.4)'
                  }}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative py-24 bg-linear-to-b from-black to-gray-950">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Fitness Enthusiasts
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of people transforming their fitness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "FitBuilder completely changed how I approach workouts. The custom routines are perfect for my schedule.",
                author: "Sarah M.",
                role: "Marathon Runner"
              },
              {
                quote: "Finally, a fitness app that understands my goals. Progress tracking keeps me motivated every day.",
                author: "Mike T.",
                role: "Powerlifter"
              },
              {
                quote: "The exercise library is incredible. I've discovered so many new movements to add to my routine.",
                author: "Jessica L.",
                role: "Yoga Instructor"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(83, 141, 78, 0.2)'
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-yellow-400">★</div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(83, 141, 78, 0.15), transparent 70%)'
          }}
        />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div 
            className="rounded-3xl p-12 md:p-16 text-center border relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(83, 141, 78, 0.1)',
              borderColor: 'rgba(83, 141, 78, 0.3)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle, #7BC96F 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of users building better routines and achieving their fitness goals.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button 
                  asChild 
                  className="text-white border-0 shadow-xl shadow-green-900/50"
                  style={{ 
                    backgroundColor: '#538D4E',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#447038'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#538D4E'}
                >
                  <Link href="/exercises" className="flex items-center gap-2">
                    Start Building Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                <Button 
                  variant="outline" 
                  asChild
                  className="bg-white/5 backdrop-blur-sm"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  <Link href="/routines">
                    View Templates
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#7BC96F' }} />
                  Free forever
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#7BC96F' }} />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#7BC96F' }} />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t" style={{ borderColor: 'rgba(83, 141, 78, 0.2)' }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" style={{ color: '#7BC96F' }} />
              <span className="text-xl font-bold text-white">FitBuilder</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2026 FitBuilder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
