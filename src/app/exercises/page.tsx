"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dumbbell, Home, Building2, PlayCircle, Info } from "lucide-react";

type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
type MuscleGroup = "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core" | "Full Body";
type Equipment = "Bodyweight" | "Dumbbells" | "Barbell" | "Resistance Bands" | "Cable Machine";
type Location = "Home" | "Gym" | "Both";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  difficulty: DifficultyLevel;
  instructions: string[];
  tips: string[];
  videoUrl?: string;
  location: Location;
}

// Sample exercise data
const exercises: Exercise[] = [
  {
    id: 1,
    name: "Push-ups",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Start in a plank position with hands shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Push back up to starting position",
      "Repeat for desired reps"
    ],
    tips: [
      "Keep your core engaged throughout",
      "Maintain a straight line from head to heels",
      "Don't let your hips sag"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif"
  },
  {
    id: 2,
    name: "Barbell Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Position barbell on your upper back",
      "Stand with feet shoulder-width apart",
      "Lower down by bending knees and hips",
      "Push through heels to return to start"
    ],
    tips: [
      "Keep your chest up and back straight",
      "Knees should track over toes",
      "Go as low as your mobility allows"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif"
  },
  {
    id: 3,
    name: "Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Sit or stand with dumbbells at shoulder height",
      "Press weights overhead until arms are fully extended", 
      "Lower back to shoulder height with control",
      "Repeat for desired reps"
    ],
    tips: [
      "Engage your core for stability",
      "Don't arch your back excessively",
      "Control the weight on the way down"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif"
  },
  {
    id: 4,
    name: "Pull-ups",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    location: "Both",
    instructions: [
      "Hang from a pull-up bar with hands slightly wider than shoulder-width",
      "Pull yourself up until chin is over the bar",
      "Lower yourself back down with control",
      "Repeat for desired reps"
    ],
    tips: [
      "Engage your lats and squeeze shoulder blades together",
      "Avoid swinging or using momentum",
      "Use resistance bands for assistance if needed"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif"
  },
  {
    id: 5,
    name: "Plank",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Start in a forearm plank position",
      "Keep body in a straight line from head to heels",
      "Hold the position for desired time",
      "Breathe steadily throughout"
    ],
    tips: [
      "Don't let hips sag or pike up",
      "Keep neck neutral by looking at the floor",
      "Engage your core and glutes"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif"
  },
  {
    id: 6,
    name: "Deadlift",
    muscleGroup: "Full Body",
    equipment: "Barbell",
    difficulty: "Advanced",
    location: "Gym",
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot",
      "Bend at hips and knees to grip the bar",
      "Keep back straight, chest up, and lift the bar by extending hips and knees",
      "Lower the bar back to the ground with control"
    ],
    tips: [
      "Keep the bar close to your body throughout",
      "Drive through your heels",
      "Maintain a neutral spine at all times"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif"
  },
  {
    id: 7,
    name: "Bicep Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Stand with dumbbells at your sides, palms facing forward",
      "Curl the weights up while keeping elbows stationary",
      "Squeeze at the top",
      "Lower back down with control"
    ],
    tips: [
      "Don't swing the weights",
      "Keep your elbows close to your body",
      "Control the negative portion"
    ],
      videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Bicep-Curl.gif"
  },
  {
    id: 8,
    name: "Lunges",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Step forward with one leg",
      "Lower your hips until both knees are bent at 90 degrees",
      "Push back to starting position",
      "Alternate legs"
    ],
    tips: [
      "Keep your torso upright",
      "Don't let your front knee pass your toes",
      "Engage your core for balance"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunges.gif"
  }
];

const ExercisesPage = () => {
  const [muscleFilter, setMuscleFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredExercises = exercises.filter((exercise) => {
    const matchesMuscle = muscleFilter === "all" || exercise.muscleGroup === muscleFilter;
    const matchesEquipment = equipmentFilter === "all" || exercise.equipment === equipmentFilter;
    const matchesLocation = locationFilter === "all" || exercise.location === locationFilter || exercise.location === "Both";
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    
    return matchesMuscle && matchesEquipment && matchesLocation && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Advanced": return "bg-red-500/10 text-red-700 dark:text-red-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Exercise Library</h1>
        <p className="text-muted-foreground">Browse our comprehensive collection of exercises</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Select value={muscleFilter} onValueChange={setMuscleFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Muscle Group" />
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

        <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Equipment</SelectItem>
            <SelectItem value="Bodyweight">Bodyweight</SelectItem>
            <SelectItem value="Dumbbells">Dumbbells</SelectItem>
            <SelectItem value="Barbell">Barbell</SelectItem>
            <SelectItem value="Resistance Bands">Resistance Bands</SelectItem>
            <SelectItem value="Cable Machine">Cable Machine</SelectItem>
          </SelectContent>
        </Select>

        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
            <SelectItem value="Gym">Gym</SelectItem>
          </SelectContent>
        </Select>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Exercise Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="overflow-hidden flex flex-col">
            {/* Video/GIF Demo */}
            {exercise.videoUrl && (
              <div className="relative aspect-video w-full bg-muted overflow-hidden">
                <img 
                  src={exercise.videoUrl} 
                  alt={`${exercise.name} demonstration`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader className="pb-3 space-y-2">
              <CardTitle className="text-lg">{exercise.name}</CardTitle>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  <Dumbbell className="h-3 w-3" />
                  {exercise.equipment}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {exercise.muscleGroup}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  {exercise.location === "Home" ? (
                    <Home className="h-3 w-3" />
                  ) : exercise.location === "Gym" ? (
                    <Building2 className="h-3 w-3" />
                  ) : (
                    <Home className="h-3 w-3" />
                  )}
                  {exercise.location}
                </Badge>
              </div>
              <Badge className={getDifficultyColor(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-2 pt-0">
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Info className="h-3.5 w-3.5 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{exercise.name}</DialogTitle>
                      <DialogDescription className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {exercise.equipment}
                        </Badge>
                        <Badge variant="outline">
                          {exercise.muscleGroup}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {exercise.location === "Home" ? (
                            <Home className="h-3 w-3" />
                          ) : exercise.location === "Gym" ? (
                            <Building2 className="h-3 w-3" />
                          ) : (
                            <Home className="h-3 w-3" />
                          )}
                          {exercise.location}
                        </Badge>
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty}
                        </Badge>
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 pt-4">
                      {/* Video/GIF in Dialog */}
                      {exercise.videoUrl && (
                        <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={exercise.videoUrl} 
                            alt={`${exercise.name} demonstration`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <PlayCircle className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Instructions */}
                      <div>
                        <h4 className="font-semibold text-base mb-3">Instructions:</h4>
                        <ol className="space-y-2 text-sm text-muted-foreground">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="font-medium text-foreground">{index + 1}.</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="font-semibold text-base mb-3">Tips:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {exercise.tips.map((tip, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="text-foreground">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full">Add to Routine</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1">Add to Routine</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No exercises found matching your filters.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setMuscleFilter("all");
              setEquipmentFilter("all");
              setLocationFilter("all");
              setDifficultyFilter("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExercisesPage;