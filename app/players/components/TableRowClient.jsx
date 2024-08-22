"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TableRowClient(player) {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push("/players/" + player?.id)}
      className="hover:cursor-pointer"
    >
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="player image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={
            player?.player_face_url
              ? player.player_face_url
              : "/player_placeholder.jpeg"
          }
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">
        {player?.short_name || player?.long_name}
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {player?.player_iterations[0]?.player_attributes?.age < 25 &&
          player?.player_iterations[0]?.player_ratings?.potential > 80 ? (
            <>
              Hot
              <Flame className="h-3 w-3" />
            </>
          ) : (
            "Moderate"
          )}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {player?.player_iterations[0]?.club_position}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {player?.nationality?.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {player?.player_iterations[0]?.player_attributes?.age}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {player?.player_iterations[0]?.club?.name}
      </TableCell>
    </TableRow>
  );
}
