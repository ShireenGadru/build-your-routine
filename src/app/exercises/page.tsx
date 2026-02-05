"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, Home, Building2, PlayCircle, Info, Plus, Filter, X, ChevronDown, Zap, Target, MapPin } from "lucide-react";

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
  },
  {
    id: 9,
    name: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Lie on bench with feet flat on floor",
      "Grip bar slightly wider than shoulder-width",
      "Lower bar to mid-chest with control",
      "Press bar back up to starting position"
    ],
    tips: [
      "Keep shoulder blades retracted",
      "Maintain contact between lower back and bench",
      "Use a spotter for heavy weights"
    ]
  },
  {
    id: 10,
    name: "Dumbbell Bench Press",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Lie on bench with dumbbells at chest level",
      "Press dumbbells up until arms are extended",
      "Lower with control back to chest level",
      "Repeat for desired reps"
    ],
    tips: [
      "Keep wrists straight",
      "Control the dumbbells throughout the movement",
      "Squeeze chest at the top"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Bench-Press.gif"
  },
  {
    id: 11,
    name: "Incline Dumbbell Press",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Set bench to 30-45 degree incline",
      "Start with dumbbells at upper chest",
      "Press weights up until arms are extended",
      "Lower back down with control"
    ],
    tips: [
      "Focus on upper chest engagement",
      "Don't arch your back excessively",
      "Keep core tight"
    ]
  },
  {
    id: 12,
    name: "Cable Chest Fly",
    muscleGroup: "Chest",
    equipment: "Cable Machine",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Set cables at chest height",
      "Step forward with slight bend in elbows",
      "Bring handles together in front of chest",
      "Return to starting position with control"
    ],
    tips: [
      "Maintain slight bend in elbows throughout",
      "Focus on chest contraction",
      "Don't let cables pull you backward"
    ]
  },
  {
    id: 13,
    name: "Dips",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    location: "Both",
    instructions: [
      "Support yourself on parallel bars",
      "Lean forward slightly",
      "Lower body by bending elbows",
      "Push back up to starting position"
    ],
    tips: [
      "Lean forward to target chest more",
      "Keep shoulders down and back",
      "Use assistance if needed"
    ]
  },
  {
    id: 14,
    name: "Bent-Over Barbell Row",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Bend at hips with slight knee bend",
      "Grip barbell with hands shoulder-width apart",
      "Pull bar to lower chest",
      "Lower with control"
    ],
    tips: [
      "Keep back flat throughout",
      "Pull with elbows, not hands",
      "Squeeze shoulder blades at top"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif"
  },
  {
    id: 15,
    name: "Dumbbell Row",
    muscleGroup: "Back",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Place one knee and hand on bench",
      "Hold dumbbell in opposite hand",
      "Pull dumbbell to hip",
      "Lower with control"
    ],
    tips: [
      "Keep back parallel to floor",
      "Don't rotate torso",
      "Focus on pulling with back, not arms"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif"
  },
  {
    id: 16,
    name: "Lat Pulldown",
    muscleGroup: "Back",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    location: "Gym",
    instructions: [
      "Sit at lat pulldown machine",
      "Grip bar wider than shoulder-width",
      "Pull bar down to upper chest",
      "Return to starting position with control"
    ],
    tips: [
      "Lean back slightly",
      "Pull with elbows, not hands",
      "Don't use momentum"
    ]
  },
  {
    id: 17,
    name: "Seated Cable Row",
    muscleGroup: "Back",
    equipment: "Cable Machine",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Sit at cable row machine",
      "Grip handles with arms extended",
      "Pull handles to torso",
      "Return to start with control"
    ],
    tips: [
      "Keep back straight",
      "Squeeze shoulder blades together",
      "Don't round your back"
    ]
  },
  {
    id: 18,
    name: "T-Bar Row",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Straddle T-bar with slight knee bend",
      "Bend forward at hips",
      "Pull bar to chest",
      "Lower with control"
    ],
    tips: [
      "Keep chest up",
      "Maintain neutral spine",
      "Focus on lat engagement"
    ]
  },
  {
    id: 19,
    name: "Face Pulls",
    muscleGroup: "Shoulders",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    location: "Gym",
    instructions: [
      "Set cable at upper chest height",
      "Pull rope attachment toward face",
      "Flare elbows out to sides",
      "Return to start with control"
    ],
    tips: [
      "Focus on rear delts",
      "Keep elbows high",
      "Squeeze shoulder blades together"
    ]
  },
  {
    id: 20,
    name: "Lateral Raises",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Stand with dumbbells at sides",
      "Raise arms out to sides to shoulder height",
      "Lower with control",
      "Repeat for desired reps"
    ],
    tips: [
      "Keep slight bend in elbows",
      "Don't swing the weights",
      "Lead with elbows, not hands"
    ],
    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif"
  },
  {
    id: 21,
    name: "Front Raises",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Stand with dumbbells in front of thighs",
      "Raise dumbbells forward to shoulder height",
      "Lower back down with control",
      "Alternate or do both arms together"
    ],
    tips: [
      "Keep core engaged",
      "Don't arch your back",
      "Control the movement"
    ]
  },
  {
    id: 22,
    name: "Arnold Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Start with dumbbells at shoulder height, palms facing you",
      "Rotate palms forward as you press up",
      "Press weights overhead",
      "Reverse motion on the way down"
    ],
    tips: [
      "Control the rotation",
      "Keep core tight",
      "Don't rush the movement"
    ]
  },
  {
    id: 23,
    name: "Military Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Start with barbell at shoulder height",
      "Press bar overhead until arms are extended",
      "Lower bar back to shoulders with control",
      "Keep core engaged throughout"
    ],
    tips: [
      "Don't arch back excessively",
      "Keep elbows slightly forward",
      "Maintain tight core"
    ]
  },
  {
    id: 24,
    name: "Reverse Fly",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Bend forward at hips with dumbbells hanging",
      "Raise arms out to sides",
      "Squeeze shoulder blades together",
      "Lower with control"
    ],
    tips: [
      "Focus on rear delts",
      "Keep slight bend in elbows",
      "Don't use momentum"
    ]
  },
  {
    id: 25,
    name: "Shrugs",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Stand with dumbbells at sides",
      "Lift shoulders straight up toward ears",
      "Hold briefly at top",
      "Lower back down"
    ],
    tips: [
      "Don't roll shoulders",
      "Lift straight up and down",
      "Squeeze traps at the top"
    ]
  },
  {
    id: 26,
    name: "Goblet Squat",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Hold dumbbell at chest level",
      "Stand with feet shoulder-width apart",
      "Squat down keeping chest up",
      "Push through heels to stand"
    ],
    tips: [
      "Keep elbows inside knees",
      "Chest stays up",
      "Go as low as mobility allows"
    ]
  },
  {
    id: 27,
    name: "Bulgarian Split Squat",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Place rear foot on bench behind you",
      "Hold dumbbells at sides",
      "Lower down into lunge position",
      "Push through front heel to return"
    ],
    tips: [
      "Keep torso upright",
      "Front knee stays over ankle",
      "Great for unilateral leg development"
    ]
  },
  {
    id: 28,
    name: "Romanian Deadlift",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Hold barbell at hip level",
      "Push hips back while lowering bar",
      "Keep back flat and slight knee bend",
      "Return to standing by driving hips forward"
    ],
    tips: [
      "Feel stretch in hamstrings",
      "Keep bar close to legs",
      "Maintain neutral spine"
    ]
  },
  {
    id: 29,
    name: "Leg Press",
    muscleGroup: "Legs",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    location: "Gym",
    instructions: [
      "Sit in leg press machine",
      "Place feet shoulder-width on platform",
      "Lower platform by bending knees",
      "Push back to starting position"
    ],
    tips: [
      "Don't lock knees at top",
      "Keep lower back against pad",
      "Control the negative"
    ]
  },
  {
    id: 30,
    name: "Leg Curl",
    muscleGroup: "Legs",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    location: "Gym",
    instructions: [
      "Lie face down on leg curl machine",
      "Curl legs up toward glutes",
      "Squeeze at top",
      "Lower with control"
    ],
    tips: [
      "Don't lift hips off pad",
      "Focus on hamstring contraction",
      "Use full range of motion"
    ]
  },
  {
    id: 31,
    name: "Leg Extension",
    muscleGroup: "Legs",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    location: "Gym",
    instructions: [
      "Sit in leg extension machine",
      "Extend legs until straight",
      "Squeeze quads at top",
      "Lower with control"
    ],
    tips: [
      "Don't lock knees",
      "Control the movement",
      "Squeeze at the top"
    ]
  },
  {
    id: 32,
    name: "Calf Raises",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Stand with feet hip-width apart",
      "Rise up onto toes",
      "Hold briefly at top",
      "Lower back down"
    ],
    tips: [
      "Get full range of motion",
      "Can be done on edge of step",
      "Add weight for progression"
    ]
  },
  {
    id: 33,
    name: "Step-ups",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Place one foot on elevated surface",
      "Push through heel to step up",
      "Bring other foot to platform",
      "Step back down and repeat"
    ],
    tips: [
      "Use controlled movements",
      "Don't push off back leg",
      "Keep torso upright"
    ]
  },
  {
    id: 34,
    name: "Hammer Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Hold dumbbells with palms facing each other",
      "Curl weights up keeping palms neutral",
      "Squeeze at top",
      "Lower with control"
    ],
    tips: [
      "Keep elbows stationary",
      "Don't swing",
      "Targets brachialis and forearms"
    ]
  },
  {
    id: 35,
    name: "Tricep Dips",
    muscleGroup: "Arms",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Place hands on bench behind you",
      "Lower body by bending elbows",
      "Keep elbows pointing back",
      "Push back up to start"
    ],
    tips: [
      "Keep shoulders down",
      "Don't go too low if you have shoulder issues",
      "Add weight on lap for progression"
    ]
  },
  {
    id: 36,
    name: "Overhead Tricep Extension",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Hold dumbbell overhead with both hands",
      "Lower weight behind head by bending elbows",
      "Keep elbows pointing up",
      "Extend back to starting position"
    ],
    tips: [
      "Keep elbows close to head",
      "Don't flare elbows out",
      "Control the stretch"
    ]
  },
  {
    id: 37,
    name: "Tricep Pushdown",
    muscleGroup: "Arms",
    equipment: "Cable Machine",
    difficulty: "Beginner",
    location: "Gym",
    instructions: [
      "Stand at cable machine with rope or bar attachment",
      "Push down until arms are fully extended",
      "Keep elbows at sides",
      "Return to starting position with control"
    ],
    tips: [
      "Don't let elbows flare out",
      "Squeeze triceps at bottom",
      "Keep upper arms stationary"
    ]
  },
  {
    id: 38,
    name: "Close-Grip Bench Press",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Lie on bench with hands closer than shoulder-width",
      "Lower bar to chest",
      "Press back up focusing on triceps",
      "Keep elbows closer to body"
    ],
    tips: [
      "Don't go too narrow on grip",
      "Tuck elbows slightly",
      "Great for tricep mass"
    ]
  },
  {
    id: 39,
    name: "Concentration Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Sit with elbow braced against inner thigh",
      "Curl weight up with focused contraction",
      "Squeeze at top",
      "Lower with control"
    ],
    tips: [
      "Isolates biceps well",
      "Focus on mind-muscle connection",
      "Don't use momentum"
    ]
  },
  {
    id: 40,
    name: "Russian Twists",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Sit with knees bent, feet off floor",
      "Lean back slightly",
      "Rotate torso side to side",
      "Touch floor on each side"
    ],
    tips: [
      "Keep chest up",
      "Control the rotation",
      "Add weight for progression"
    ]
  },
  {
    id: 41,
    name: "Mountain Climbers",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Start in plank position",
      "Drive one knee toward chest",
      "Quickly switch legs",
      "Continue alternating"
    ],
    tips: [
      "Keep hips level",
      "Maintain plank position",
      "Great cardio element"
    ]
  },
  {
    id: 42,
    name: "Bicycle Crunches",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Lie on back with hands behind head",
      "Bring opposite elbow to opposite knee",
      "Extend other leg",
      "Alternate in cycling motion"
    ],
    tips: [
      "Don't pull on neck",
      "Focus on rotation",
      "Slow and controlled"
    ]
  },
  {
    id: 43,
    name: "Dead Bug",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Lie on back with arms extended up",
      "Bring knees to 90 degrees",
      "Lower opposite arm and leg",
      "Return and alternate"
    ],
    tips: [
      "Keep lower back pressed to floor",
      "Move slowly and controlled",
      "Great for core stability"
    ]
  },
  {
    id: 44,
    name: "Hanging Leg Raises",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    location: "Both",
    instructions: [
      "Hang from pull-up bar",
      "Keep legs straight or bent",
      "Raise legs up to 90 degrees",
      "Lower with control"
    ],
    tips: [
      "Don't swing",
      "Focus on lower abs",
      "Bend knees for easier variation"
    ]
  },
  {
    id: 45,
    name: "Cable Woodchoppers",
    muscleGroup: "Core",
    equipment: "Cable Machine",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Set cable at high position",
      "Pull cable diagonally across body",
      "Rotate torso with movement",
      "Return to start with control"
    ],
    tips: [
      "Keep arms relatively straight",
      "Focus on rotation",
      "Works obliques"
    ]
  },
  {
    id: 46,
    name: "Burpees",
    muscleGroup: "Full Body",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Start standing",
      "Drop to plank position",
      "Perform a push-up",
      "Jump feet to hands and jump up"
    ],
    tips: [
      "Maintain form even when tired",
      "Great for conditioning",
      "Modify by removing jump"
    ]
  },
  {
    id: 47,
    name: "Kettlebell Swings",
    muscleGroup: "Full Body",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Stand with kettlebell between feet",
      "Hinge at hips and swing kettlebell back",
      "Drive hips forward to swing kettlebell up",
      "Let it swing back down and repeat"
    ],
    tips: [
      "Power comes from hips, not arms",
      "Keep back flat",
      "Great for conditioning"
    ]
  },
  {
    id: 48,
    name: "Clean and Press",
    muscleGroup: "Full Body",
    equipment: "Barbell",
    difficulty: "Advanced",
    location: "Gym",
    instructions: [
      "Deadlift bar to hang position",
      "Pull and catch at shoulders",
      "Press overhead",
      "Lower back down"
    ],
    tips: [
      "Complex movement requiring practice",
      "Keep bar close to body",
      "Drive with legs"
    ]
  },
  {
    id: 49,
    name: "Box Jumps",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Stand facing a box or platform",
      "Jump onto box with both feet",
      "Land softly with bent knees",
      "Step down and repeat"
    ],
    tips: [
      "Start with lower box height",
      "Land softly",
      "Great for explosive power"
    ]
  },
  {
    id: 50,
    name: "Wall Sits",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Lean against wall",
      "Slide down until thighs are parallel to floor",
      "Hold position",
      "Maintain 90-degree angles at knees"
    ],
    tips: [
      "Keep back flat against wall",
      "Don't let knees go past toes",
      "Great for building endurance"
    ]
  },
  {
    id: 51,
    name: "Diamond Push-ups",
    muscleGroup: "Arms",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Start in push-up position with hands close together",
      "Form diamond shape with index fingers and thumbs",
      "Lower chest to hands",
      "Push back up"
    ],
    tips: [
      "Targets triceps heavily",
      "Keep elbows close to body",
      "Maintain straight body line"
    ]
  },
  {
    id: 52,
    name: "Pike Push-ups",
    muscleGroup: "Shoulders",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Start in downward dog position",
      "Bend elbows to lower head toward floor",
      "Keep hips high",
      "Push back to start"
    ],
    tips: [
      "Great shoulder builder",
      "Keep core engaged",
      "Progress toward handstand push-ups"
    ]
  },
  {
    id: 53,
    name: "Farmers Walk",
    muscleGroup: "Full Body",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Hold heavy dumbbells at sides",
      "Walk forward with good posture",
      "Keep core tight and shoulders back",
      "Walk for distance or time"
    ],
    tips: [
      "Great for grip strength",
      "Keep shoulders down",
      "Maintain upright posture"
    ]
  },
  {
    id: 54,
    name: "Hip Thrusts",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Sit with upper back against bench",
      "Place barbell over hips",
      "Drive through heels to lift hips",
      "Squeeze glutes at top"
    ],
    tips: [
      "Excellent for glute development",
      "Keep chin tucked",
      "Full hip extension at top"
    ]
  },
  {
    id: 55,
    name: "Resistance Band Rows",
    muscleGroup: "Back",
    equipment: "Resistance Bands",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Anchor band at chest height",
      "Pull handles toward torso",
      "Squeeze shoulder blades",
      "Return with control"
    ],
    tips: [
      "Great for home workouts",
      "Keep back straight",
      "Focus on squeezing back"
    ]
  },
  {
    id: 56,
    name: "Resistance Band Chest Press",
    muscleGroup: "Chest",
    equipment: "Resistance Bands",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Anchor band behind you at chest height",
      "Press handles forward",
      "Squeeze chest at extension",
      "Return with control"
    ],
    tips: [
      "Step forward for more tension",
      "Keep core engaged",
      "Excellent alternative to bench press"
    ]
  },
  {
    id: 57,
    name: "Superman Holds",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    location: "Both",
    instructions: [
      "Lie face down on floor",
      "Extend arms forward",
      "Lift arms, chest, and legs off floor",
      "Hold position"
    ],
    tips: [
      "Great for lower back strength",
      "Don't strain neck",
      "Breathe steadily"
    ]
  },
  {
    id: 58,
    name: "Chin-ups",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    location: "Both",
    instructions: [
      "Hang from bar with underhand grip",
      "Pull yourself up until chin is over bar",
      "Lower with control",
      "Repeat"
    ],
    tips: [
      "Slightly easier than pull-ups",
      "More bicep involvement",
      "Use assistance if needed"
    ]
  },
  {
    id: 59,
    name: "Inverted Rows",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    location: "Both",
    instructions: [
      "Lie under bar set at waist height",
      "Pull chest to bar",
      "Keep body straight",
      "Lower with control"
    ],
    tips: [
      "Great pull-up progression",
      "Keep core tight",
      "Elevate feet to increase difficulty"
    ]
  },
  {
    id: 60,
    name: "Preacher Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    location: "Gym",
    instructions: [
      "Rest upper arms on preacher bench",
      "Curl weight up",
      "Squeeze at top",
      "Lower with control"
    ],
    tips: [
      "Isolates biceps well",
      "No cheating possible",
      "Control the negative"
    ]
  }
];

const ExercisesPage = () => {
  const [muscleFilter, setMuscleFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Form state for new exercise
  const [newExercise, setNewExercise] = useState({
    name: "",
    muscleGroup: "Chest" as MuscleGroup,
    equipment: "Bodyweight" as Equipment,
    difficulty: "Beginner" as DifficultyLevel,
    location: "Both" as Location,
    instructions: "",
    tips: "",
    videoUrl: ""
  });

  // Combine built-in and custom exercises
  const allExercises = [...exercises, ...customExercises];

  const filteredExercises = allExercises.filter((exercise) => {
    const matchesMuscle = muscleFilter === "all" || exercise.muscleGroup === muscleFilter;
    const matchesEquipment = equipmentFilter === "all" || exercise.equipment === equipmentFilter;
    const matchesLocation = locationFilter === "all" || exercise.location === locationFilter || exercise.location === "Both";
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    
    return matchesMuscle && matchesEquipment && matchesLocation && matchesDifficulty;
  });

  const handleCreateExercise = () => {
    const exercise: Exercise = {
      id: allExercises.length + 1,
      name: newExercise.name,
      muscleGroup: newExercise.muscleGroup,
      equipment: newExercise.equipment,
      difficulty: newExercise.difficulty,
      location: newExercise.location,
      instructions: newExercise.instructions.split('\n').filter(i => i.trim()),
      tips: newExercise.tips.split('\n').filter(t => t.trim()),
      videoUrl: newExercise.videoUrl || undefined
    };
    
    setCustomExercises([...customExercises, exercise]);
    setIsCreateDialogOpen(false);
    
    // Reset form
    setNewExercise({
      name: "",
      muscleGroup: "Chest",
      equipment: "Bodyweight",
      difficulty: "Beginner",
      location: "Both",
      instructions: "",
      tips: "",
      videoUrl: ""
    });
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Advanced": return "bg-red-500/10 text-red-700 dark:text-red-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Exercise Library</h1>
          <p className="text-muted-foreground">Browse our comprehensive collection of exercises</p>
        </div>
        
        {/* Create New Exercise Button */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Exercise
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Custom Exercise</DialogTitle>
              <DialogDescription>
                Can't find the exercise you're looking for? Create your own!
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Single Leg Deadlift"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="muscleGroup">Muscle Group *</Label>
                  <Select 
                    value={newExercise.muscleGroup} 
                    onValueChange={(value) => setNewExercise({...newExercise, muscleGroup: value as MuscleGroup})}
                  >
                    <SelectTrigger id="muscleGroup">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chest">Chest</SelectItem>
                      <SelectItem value="Back">Back</SelectItem>
                      <SelectItem value="Legs">Legs</SelectItem>
                      <SelectItem value="Shoulders">Shoulders</SelectItem>
                      <SelectItem value="Arms">Arms</SelectItem>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Full Body">Full Body</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment *</Label>
                  <Select 
                    value={newExercise.equipment} 
                    onValueChange={(value) => setNewExercise({...newExercise, equipment: value as Equipment})}
                  >
                    <SelectTrigger id="equipment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bodyweight">Bodyweight</SelectItem>
                      <SelectItem value="Dumbbells">Dumbbells</SelectItem>
                      <SelectItem value="Barbell">Barbell</SelectItem>
                      <SelectItem value="Resistance Bands">Resistance Bands</SelectItem>
                      <SelectItem value="Cable Machine">Cable Machine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select 
                    value={newExercise.difficulty} 
                    onValueChange={(value) => setNewExercise({...newExercise, difficulty: value as DifficultyLevel})}
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select 
                    value={newExercise.location} 
                    onValueChange={(value) => setNewExercise({...newExercise, location: value as Location})}
                  >
                    <SelectTrigger id="location">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Gym">Gym</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Enter each step on a new line"
                  value={newExercise.instructions}
                  onChange={(e) => setNewExercise({...newExercise, instructions: e.target.value})}
                  rows={5}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">One instruction per line</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tips">Tips</Label>
                <Textarea
                  id="tips"
                  placeholder="Enter each tip on a new line"
                  value={newExercise.tips}
                  onChange={(e) => setNewExercise({...newExercise, tips: e.target.value})}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">One tip per line</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video/GIF URL (Optional)</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://example.com/exercise.gif"
                  value={newExercise.videoUrl}
                  onChange={(e) => setNewExercise({...newExercise, videoUrl: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCreateExercise}
                  disabled={!newExercise.name.trim()}
                  className="flex-1"
                >
                  Create Exercise
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters - Compact Collapsible Design */}
      <div className="mb-6">
        {/* Filter Toggle Bar */}
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {/* Active Filters Summary */}
            <div className="flex flex-wrap gap-2">
              {muscleFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Dumbbell className="h-3 w-3" />
                  {muscleFilter}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => setMuscleFilter("all")}
                  />
                </Badge>
              )}
              {equipmentFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {equipmentFilter}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => setEquipmentFilter("all")}
                  />
                </Badge>
              )}
              {locationFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {locationFilter}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => setLocationFilter("all")}
                  />
                </Badge>
              )}
              {difficultyFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {difficultyFilter}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => setDifficultyFilter("all")}
                  />
                </Badge>
              )}
            </div>
          </div>

          {/* Clear All Button */}
          {(muscleFilter !== "all" || equipmentFilter !== "all" || locationFilter !== "all" || difficultyFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMuscleFilter("all");
                setEquipmentFilter("all");
                setLocationFilter("all");
                setDifficultyFilter("all");
              }}
              className="text-sm"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Expandable Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 p-4 border rounded-lg bg-card space-y-4 animate-in slide-in-from-top-2">
            {/* Muscle Group */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <Dumbbell className="h-4 w-4" />
                Muscle Group
              </Label>
              <div className="flex flex-wrap gap-2">
                {["all", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body"].map((muscle) => (
                  <Button
                    key={muscle}
                    variant={muscleFilter === muscle ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMuscleFilter(muscle)}
                    className="transition-all"
                  >
                    {muscle === "all" ? "All" : muscle}
                  </Button>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4" />
                Equipment
              </Label>
              <div className="flex flex-wrap gap-2">
                {["all", "Bodyweight", "Dumbbells", "Barbell", "Resistance Bands", "Cable Machine"].map((equipment) => (
                  <Button
                    key={equipment}
                    variant={equipmentFilter === equipment ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEquipmentFilter(equipment)}
                    className="transition-all"
                  >
                    {equipment === "all" ? "All" : equipment}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <div className="flex flex-wrap gap-2">
                {["all", "Home", "Gym"].map((location) => (
                  <Button
                    key={location}
                    variant={locationFilter === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLocationFilter(location)}
                    className="transition-all"
                  >
                    {location === "all" ? "All" : location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" />
                Difficulty Level
              </Label>
              <div className="flex flex-wrap gap-2">
                {["all", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={difficultyFilter === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDifficultyFilter(difficulty)}
                    className="transition-all"
                  >
                    {difficulty === "all" ? "All" : difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
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