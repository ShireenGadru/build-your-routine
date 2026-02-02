"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, Calendar, Trash2, Eye } from "lucide-react";

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

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const router = useRouter();

  // Load routines from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fitbuilder-routines");
    if (saved) {
      setRoutines(JSON.parse(saved));
    }
  }, []);

  // Delete routine
  const deleteRoutine = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this routine?")) {
      const updatedRoutines = routines.filter((r) => r.id !== id);
      setRoutines(updatedRoutines);
      localStorage.setItem("fitbuilder-routines", JSON.stringify(updatedRoutines));
    }
  };

  // View routine details
  const viewRoutine = (id: string) => {
    router.push(`/routines/${id}`);
  };

  // Navigate to create new routine
  const createNewRoutine = () => {
    router.push("/routines/new");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Routines</h1>
          <p className="text-muted-foreground">
            View and manage your workout routines
          </p>
        </div>
        <Button onClick={createNewRoutine} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          New Routine
        </Button>
      </div>

      {/* Routines Grid */}
      {routines.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Dumbbell className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No routines yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Create your first workout routine to get started on your fitness journey
            </p>
            <Button onClick={createNewRoutine}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Routine
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routines.map((routine) => (
            <Card
              key={routine.id}
              className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
              onClick={() => viewRoutine(routine.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{routine.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => deleteRoutine(routine.id, e)}
                    className="text-destructive hover:text-destructive -mr-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="space-y-4 flex-1">
                  {/* Exercise Count */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Dumbbell className="h-4 w-4" />
                    <span>{routine.exercises.length} exercise{routine.exercises.length !== 1 ? 's' : ''}</span>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created {new Date(routine.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Exercise Preview */}
                  {routine.exercises.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase">Exercises:</p>
                      <div className="space-y-1">
                        {routine.exercises.slice(0, 3).map((ex) => (
                          <div key={ex.uniqueId} className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="text-xs">
                              {ex.exercise.muscleGroup}
                            </Badge>
                            <span className="truncate">{ex.exercise.name}</span>
                          </div>
                        ))}
                        {routine.exercises.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{routine.exercises.length - 3} more...
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* View Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewRoutine(routine.id);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Routine
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
