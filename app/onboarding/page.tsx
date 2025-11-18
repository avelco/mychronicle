"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  className?: string;
}

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default:
      "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20",
    outline:
      "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
    ghost: "hover:bg-slate-800 text-slate-100",
  };
  const sizes = {
    default: "h-10 px-6 py-2",
    lg: "h-12 px-8 text-lg",
    sm: "h-8 px-4 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className = "", onClick }: CardProps) => (
  <div
    className={`rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const genderOptions = [
    { id: "male", label: "Male", emoji: "👨" },
    { id: "female", label: "Female", emoji: "👩" },
    { id: "prefer-not", label: "Prefer not to say", emoji: "✨" },
  ];

  const topicOptions = [
    {
      id: "adventure",
      label: "Adventure",
      emoji: "🗺️",
      description: "Epic quests and exploration",
      gradient: "from-amber-600 to-orange-800",
    },
    {
      id: "romance",
      label: "Romance",
      emoji: "💕",
      description: "Love stories and relationships",
      gradient: "from-rose-600 to-pink-800",
    },
    {
      id: "mystery",
      label: "Mystery",
      emoji: "🔍",
      description: "Puzzles and detective stories",
      gradient: "from-indigo-600 to-purple-800",
    },
    {
      id: "fantasy",
      label: "Fantasy",
      emoji: "🧙‍♂️",
      description: "Magic and mythical worlds",
      gradient: "from-violet-600 to-purple-800",
    },
    {
      id: "scifi",
      label: "Sci-Fi",
      emoji: "🚀",
      description: "Future and technology",
      gradient: "from-cyan-600 to-blue-800",
    },
    {
      id: "horror",
      label: "Horror",
      emoji: "👻",
      description: "Thrills and supernatural",
      gradient: "from-slate-600 to-gray-900",
    },
    {
      id: "action",
      label: "Action",
      emoji: "⚔️",
      description: "Combat and excitement",
      gradient: "from-red-600 to-orange-800",
    },
    {
      id: "drama",
      label: "Drama",
      emoji: "🎭",
      description: "Emotional and character-driven",
      gradient: "from-purple-600 to-indigo-800",
    },
    {
      id: "school",
      label: "School Life",
      emoji: "🎓",
      description: "Campus and education",
      gradient: "from-emerald-600 to-teal-800",
    },
    {
      id: "isekai",
      label: "Isekai",
      emoji: "🌟",
      description: "Transported to another world",
      gradient: "from-yellow-600 to-amber-800",
    },
    {
      id: "comedy",
      label: "Comedy",
      emoji: "😂",
      description: "Humor and fun",
      gradient: "from-lime-600 to-green-800",
    },
    {
      id: "slice-of-life",
      label: "Slice of Life",
      emoji: "☕",
      description: "Everyday moments",
      gradient: "from-orange-600 to-red-700",
    },
  ];

  const toggleTopic = (topicId: string) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedGender) {
      setStep(2);
    } else if (step === 2 && selectedTopics.length > 0) {
      // Submit and redirect to main app
      console.log("Onboarding complete:", { selectedGender, selectedTopics });
      alert("Onboarding complete! Redirecting to your personalized experience...");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = step === 1 ? selectedGender : selectedTopics.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        .font-serif { font-family: 'Lora', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-violet-500" />
            <span className="font-serif text-xl font-bold">My Chronicle</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-2">
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-500"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-600/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">
              Step {step} of 2
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-violet-100 to-slate-300 bg-clip-text text-transparent">
            {step === 1 ? "Welcome to Your Journey" : "Choose Your Interests"}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            {step === 1
              ? "Let's personalize your storytelling experience. First, tell us about yourself."
              : "Select the genres and themes you'd like to explore. Choose as many as you like!"}
          </p>
        </div>

        {/* Step 1: Gender Selection */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                How would you like to be addressed?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {genderOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                      selectedGender === option.id
                        ? "border-violet-600 bg-violet-600/10 shadow-lg shadow-violet-600/20"
                        : "hover:border-slate-700"
                    }`}
                    onClick={() => setSelectedGender(option.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{option.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{option.label}</h3>
                      </div>
                      {selectedGender === option.id && (
                        <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Topic Selection */}
        {step === 2 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="text-center mb-6">
                <p className="text-slate-400">
                  {selectedTopics.length === 0
                    ? "Select at least one topic to continue"
                    : `${selectedTopics.length} topic${
                        selectedTopics.length > 1 ? "s" : ""
                      } selected`}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topicOptions.map((topic) => {
                  const isSelected = selectedTopics.includes(topic.id);
                  return (
                    <Card
                      key={topic.id}
                      className={`p-4 cursor-pointer transition-all hover:scale-105 relative overflow-hidden ${
                        isSelected
                          ? "border-violet-600 shadow-lg shadow-violet-600/20"
                          : "hover:border-slate-700"
                      }`}
                      onClick={() => toggleTopic(topic.id)}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center z-10">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`w-full aspect-square bg-gradient-to-br ${topic.gradient} rounded-lg mb-3 flex items-center justify-center`}
                      >
                        <span className="text-4xl">{topic.emoji}</span>
                      </div>
                      
                      <h3 className="font-semibold text-sm mb-1 text-center">
                        {topic.label}
                      </h3>
                      <p className="text-xs text-slate-400 text-center">
                        {topic.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-3xl mx-auto mt-12">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className={step === 1 ? "invisible" : ""}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="group"
          >
            {step === 2 ? "Complete Setup" : "Continue"}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Helper Text */}
        {!canProceed && (
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              {step === 1
                ? "Please select an option to continue"
                : "Please select at least one topic to continue"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OnboardingPage;