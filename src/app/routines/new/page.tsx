"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dumbbell, GripVertical, Trash2, Save, ArrowLeft } from "lucide-react";

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

// Sample exercises data
const availableExercises: Exercise[] = [
  {
    id: 1,
    name: "Push-ups",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif"
  },
  {
    id: 2,
    name: "Barbell Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif"
  },
  {
    id: 3,
    name: "Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif"
  },
  {
    id: 4,
    name: "Pull-ups",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    location: "Both",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif"
  },
  {
    id: 5,
    name: "Plank",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif"
  },
  {
    id: 6,
    name: "Deadlift",
    muscleGroup: "Full Body",
    equipment: "Barbell",
    difficulty: "Advanced",
    location: "Gym",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif"
  },
  {
    id: 7,
    name: "Bicep Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Bicep-Curl.gif"
  },
  {
    id: 8,
    name: "Lunges",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunges.gif"
  }
];

// Draggable Exercise Item Component
function DraggableExercise({ exercise }: { exercise: Exercise }) {
  return (
    <div
      className="p-3 bg-card border rounded-lg cursor-grab hover:bg-accent transition-colors"
      draggable={false}
    >
      <div className="flex items-center gap-2">
        <Dumbbell className="h-4 w-4 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-sm">{exercise.name}</p>
          <p className="text-xs text-muted-foreground">{exercise.muscleGroup}</p>
        </div>
        <Badge variant="outline" className="text-xs">{exercise.equipment}</Badge>
      </div>
    </div>
  );
}

// Sortable Routine Exercise Item Component
function SortableRoutineExercise({
  routineExercise,
  onUpdate,
  onRemove,
}: {
  routineExercise: RoutineExercise;
  onUpdate: (id: string, field: keyof Omit<RoutineExercise, 'uniqueId' | 'exercise'>, value: string) => void;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: routineExercise.uniqueId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-card border rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <div className="flex-1 space-y-3">
          {/* Exercise Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{routineExercise.exercise.name}</h4>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {routineExercise.exercise.muscleGroup}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {routineExercise.exercise.equipment}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(routineExercise.uniqueId)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Exercise Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Sets</label>
              <Input
                type="text"
                placeholder="3"
                value={routineExercise.sets}
                onChange={(e) => onUpdate(routineExercise.uniqueId, 'sets', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Reps/Time</label>
              <Input
                type="text"
                placeholder="10 or 30s"
                value={routineExercise.reps}
                onChange={(e) => onUpdate(routineExercise.uniqueId, 'reps', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Rest Time</label>
              <Input
                type="text"
                placeholder="60s"
                value={routineExercise.restTime}
                onChange={(e) => onUpdate(routineExercise.uniqueId, 'restTime', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">Notes</label>
            <Textarea
              placeholder="e.g., go light, slow tempo, focus on form..."
              value={routineExercise.notes}
              onChange={(e) => onUpdate(routineExercise.uniqueId, 'notes', e.target.value)}
              className="mt-1 resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateRoutinePage() {
  const [currentRoutine, setCurrentRoutine] = useState<RoutineExercise[]>([]);
  const [routineName, setRoutineName] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMuscleGroup, setFilterMuscleGroup] = useState<string>("all");
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Filter exercises
  const filteredExercises = availableExercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = filterMuscleGroup === "all" || exercise.muscleGroup === filterMuscleGroup;
    return matchesSearch && matchesMuscle;
  });

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if dragging from exercise list
    if (typeof active.id === 'number') {
      const exercise = availableExercises.find((ex) => ex.id === active.id);
      if (exercise) {
        addExerciseToRoutine(exercise);
      }
      return;
    }

    // Reordering within routine
    if (active.id !== over.id) {
      setCurrentRoutine((items) => {
        const oldIndex = items.findIndex((item) => item.uniqueId === active.id);
        const newIndex = items.findIndex((item) => item.uniqueId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Add exercise to routine
  const addExerciseToRoutine = (exercise: Exercise) => {
    const newRoutineExercise: RoutineExercise = {
      uniqueId: `${exercise.id}-${Date.now()}`,
      exercise,
      sets: "3",
      reps: "10",
      restTime: "60s",
      notes: "",
    };
    setCurrentRoutine([...currentRoutine, newRoutineExercise]);
  };

  // Update routine exercise
  const updateRoutineExercise = (
    id: string,
    field: keyof Omit<RoutineExercise, 'uniqueId' | 'exercise'>,
    value: string
  ) => {
    setCurrentRoutine((prev) =>
      prev.map((item) =>
        item.uniqueId === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Remove exercise from routine
  const removeExerciseFromRoutine = (id: string) => {
    setCurrentRoutine((prev) => prev.filter((item) => item.uniqueId !== id));
  };

  // Save routine
  const saveRoutine = () => {
    if (!routineName.trim()) {
      alert("Please enter a routine name");
      return;
    }
    if (currentRoutine.length === 0) {
      alert("Please add at least one exercise to the routine");
      return;
    }

    const newRoutine: Routine = {
      id: Date.now().toString(),
      name: routineName,
      exercises: currentRoutine,
      createdAt: new Date().toISOString(),
    };

    // Load existing routines
    const saved = localStorage.getItem("fitbuilder-routines");
    const routines = saved ? JSON.parse(saved) : [];
    
    // Add new routine
    routines.push(newRoutine);
    
    // Save back to localStorage
    localStorage.setItem("fitbuilder-routines", JSON.stringify(routines));

    // Redirect to routines list
    router.push("/routines");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/routines")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Routines
        </Button>
        <h1 className="text-4xl font-bold mb-2">Create Workout Routine</h1>
        <p className="text-muted-foreground">
          Click exercises to build your custom workout routine
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Exercises Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Exercises</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Search and Filter */}
                <Input
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={filterMuscleGroup} onValueChange={setFilterMuscleGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by muscle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Muscles</SelectItem>
                    <SelectItem value="Chest">Chest</SelectItem>
                    <SelectItem value="Back">Back</SelectItem>
                    <SelectItem value="Legs">Legs</SelectItem>
                    <SelectItem value="Shoulders">Shoulders</SelectItem>
                    <SelectItem value="Arms">Arms</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Full Body">Full Body</SelectItem>
                  </SelectContent>
                </Select>

                {/* Exercise List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      onClick={() => addExerciseToRoutine(exercise)}
                      className="cursor-pointer"
                    >
                      <DraggableExercise exercise={exercise} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Routine Builder Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Routine Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Routine Name</label>
                    <Input
                      placeholder="e.g., Upper Body Day, Leg Day..."
                      value={routineName}
                      onChange={(e) => setRoutineName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button onClick={saveRoutine} className="w-full" size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    Save Routine
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Routine Exercises */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Routine Exercises ({currentRoutine.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentRoutine.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      Click exercises from the left panel to add them to your routine
                    </p>
                  </div>
                ) : (
                  <SortableContext
                    items={currentRoutine.map((ex) => ex.uniqueId)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {currentRoutine.map((routineExercise) => (
                        <SortableRoutineExercise
                          key={routineExercise.uniqueId}
                          routineExercise={routineExercise}
                          onUpdate={updateRoutineExercise}
                          onRemove={removeExerciseFromRoutine}
                        />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && typeof activeId === 'number' ? (
            <div className="opacity-50">
              <DraggableExercise
                exercise={availableExercises.find((ex) => ex.id === activeId)!}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
