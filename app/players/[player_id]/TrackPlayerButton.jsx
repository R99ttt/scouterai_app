"use client";

import { trackPlayer, untrackPlayer } from "@/app/actions/player";
import { Button } from "@/components/ui/button";
import { StarIcon, StarOff } from "lucide-react";
import { useState } from "react";

export default function trackPlayerButton({ playerId, isFollowing }) {
  const [buttonClicked, setButtonClicked] = useState(isFollowing);
  return (
    <Button
      onClick={() => {
        if (buttonClicked) {
          untrackPlayer(playerId);
        } else {
          trackPlayer(playerId);
        }
        setButtonClicked(!buttonClicked);
      }}
      size="sm"
      variant="outline"
      className="h-8 gap-1"
    >
      <span className="xl:not-sr-only xl:whitespace-nowrap">
        {buttonClicked ? (
          <StarIcon className="h-4 w-4" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
      </span>
    </Button>
  );
}
