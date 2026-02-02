"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, ArrowLeft, Clock, Repeat, Timer, Edit } from "lucide-react";

// Types
type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
type MuscleGroup = "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core" | "Full Body";
type Equipment = "Dumbbells" | "Barbell" | "Bodyweight" | "Machine";
type Location = "Home" | "Gym" | "Both";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  difficulty: DifficultyLevel;
  location: Location;
  videoUrl?: string;
}

interface RoutineExercise {
  uniqueId: string;
  exercise: Exercise;
  sets: string;
  reps: string;
  restTime: string;
  notes: string;
}

interface Routine {
  id: string;
  name: string;
  exercises: RoutineExercise[];
  createdAt: string;
}

export default function RoutineDetailPage() {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const router = useRouter();
  const params = useParams();
  const routineId = params.routineId as string;

  // Load routine from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fitbuilder-routines");
    if (saved) {
      const routines: Routine[] = JSON.parse(saved);
      const found = routines.find((r) => r.id === routineId);
      if (found) {
        setRoutine(found);
      } else {
        // Routine not found, redirect to routines list
        router.push("/routines");
      }
    } else {
      // No routines saved, redirect to routines list
      router.push("/routines");
    }
  }, [routineId, router]);

  if (!routine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading routine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/routines")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Routines
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{routine.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span>{routine.exercises.length} exercise{routine.exercises.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Created {new Date(routine.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {/* Edit Button - Could be implemented later */}
          {/* <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Routine
          </Button> */}
        </div>
      </div>

      {/* Exercises List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {routine.exercises.map((routineExercise, index) => (
          <Card key={routineExercise.uniqueId}>
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                {/* Exercise Number */}
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                
                {/* Exercise Info */}
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">
                    {routineExercise.exercise.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {routineExercise.exercise.muscleGroup}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {routineExercise.exercise.equipment}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {routineExercise.exercise.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Side - Exercise Parameters and Notes */}
                <div>
                  {/* Exercise Parameters */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2.5 bg-muted rounded-lg">
                      <Repeat className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Sets</p>
                        <p className="text-base font-semibold">{routineExercise.sets}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2.5 bg-muted rounded-lg">
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Reps/Time</p>
                        <p className="text-base font-semibold">{routineExercise.reps}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2.5 bg-muted rounded-lg">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Rest</p>
                        <p className="text-base font-semibold">{routineExercise.restTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {routineExercise.notes && (
                    <div className="p-3 bg-muted rounded-lg mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Notes:</p>
                      <p className="text-sm">{routineExercise.notes}</p>
                    </div>
                  )}
                </div>

                {/* Right Side - Exercise GIF/Video */}
                {routineExercise.exercise.videoUrl && (
                  <div className="flex items-center justify-center bg-muted rounded-lg p-3">
                    <img
                      src={routineExercise.exercise.videoUrl}
                      alt={`${routineExercise.exercise.name} demonstration`}
                      className="max-w-[280px] w-full h-auto object-contain rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {routine.exercises.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              This routine doesn't have any exercises yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
