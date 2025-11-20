import React from "react";
import { getStories } from "./_actions";
import { StoryList } from "./story-list";

const StoryPage = async () => {
  const { success, data: stories, error } = await getStories();

  if (!success || !stories) {
    return (
      <div className="p-4 text-red-500">
        Error loading stories: {error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="py-2">
      <StoryList initialStories={stories} />
    </div>
  );
};

export default StoryPage;
