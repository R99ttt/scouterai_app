import { ChevronLeft, ChevronRight, StarIcon, StarOff } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import TableRowClient from "./components/TableRowClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSessionDetails } from "../lib/session";
import prisma from "@/app/lib/prisma";

async function getPlayers(
  page_id,
  player_name,
  player_age,
  player_club_position,
  player_club_name,
  is_starred,
  user_id
) {
  try {
    const [players, totalCount] = await prisma.$transaction([
      prisma.players.findMany({
        skip: parseInt(page_id) * 10,
        take: 10,
        where: {
          long_name: {
            contains: player_name,
          },
          player_iterations: {
            some: {
              club_position: {
                contains: player_club_position,
              },
              club: {
                name: {
                  contains: player_club_name,
                },
              },
              player_attributes: {
                age: {
                  equals: player_age ? parseInt(player_age) : undefined,
                },
              },
            },
          },
          users:
            is_starred == "true"
              ? {
                  some: {
                    userId: parseInt(user_id),
                  },
                }
              : undefined, // Filter by user's starred players if is_starred == "false" is true
        },
        select: {
          id: true,
          short_name: true,
          long_name: true,
          player_iterations: {
            orderBy: {
              player_attributes: {
                age: "desc",
              },
            },
            select: {
              player_attributes: {
                select: {
                  age: true,
                },
              },
              player_ratings: { select: { potential: true } },
              club_position: true,
              club: {
                select: {
                  name: true,
                },
              },
            },
            take: 1, // Assuming you want the latest iteration
          },
          nationality: {
            select: {
              name: true,
            },
          },
          player_face_url: true,
        },
      }),
      prisma.players.count({
        where: {
          long_name: {
            contains: player_name,
          },
          player_iterations: {
            some: {
              club_position: {
                contains: player_club_position,
              },
              club: {
                name: {
                  contains: player_club_name,
                },
              },
              player_attributes: {
                age: {
                  equals: player_age ? parseInt(player_age) : undefined,
                },
              },
            },
          },
          users:
            is_starred == "true"
              ? {
                  some: {
                    userId: parseInt(user_id),
                  },
                }
              : undefined, // Filter by user's starred players if is_starred == "false" is true
        },
      }),
    ]);
    return { players, totalCount };
  } catch (error) {
    console.log("Error fetching players:", error);
    return { players: [], totalCount: 0 };
  }
}

export default async function Page({
  searchParams: {
    page_id,
    player_name,
    player_age,
    player_club_position,
    player_club_name,
    is_starred,
  },
}) {
  const sessionDetails = await getSessionDetails();

  const { players, totalCount } = await getPlayers(
    page_id ? page_id : 0,
    player_name,
    player_age,
    player_club_position,
    player_club_name,
    is_starred,
    sessionDetails?.userId
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="mb-2">Players</CardTitle>
            <CardDescription>Watch all the players</CardDescription>
          </div>
          <>
            {sessionDetails?.userId &&
              (is_starred == "true" ? (
                <Link
                  href={
                    "/players?page_id=" +
                    page_id +
                    "&player_name=" +
                    (player_name ? player_name : "") +
                    "&is_starred=false"
                  }
                  className="xl:not-sr-only xl:whitespace-nowrap"
                >
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <StarIcon className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link
                  href={
                    "/players?page_id=" +
                    page_id +
                    "&player_name=" +
                    (player_name ? player_name : "") +
                    "&is_starred=true"
                  }
                  className="xl:not-sr-only xl:whitespace-nowrap"
                >
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <StarOff className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            {sessionDetails?.isScouter && (
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Link
                  href={"/players/details"}
                  className="xl:not-sr-only xl:whitespace-nowrap"
                >
                  Add Player
                </Link>
              </Button>
            )}
          </>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Position</TableHead>
              <TableHead className="hidden md:table-cell">
                Nationality
              </TableHead>
              <TableHead className="hidden md:table-cell">Age</TableHead>
              <TableHead className="hidden md:table-cell">Team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players?.map((player) => {
              return <TableRowClient key={player?.id} {...player} />;
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            {page_id * 10 + 1}-
            {parseInt(page_id) * 10 + 10 <= totalCount
              ? parseInt(page_id) * 10 + 10
              : totalCount}
          </strong>{" "}
          of <strong>{totalCount}</strong> players
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              {parseInt(page_id) != 0 && (
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <Link
                    href={
                      "/players?page_id=" +
                      (parseInt(page_id) - 1) +
                      "&player_name=" +
                      player_name
                    }
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Page</span>
                  </Link>
                </Button>
              )}
            </PaginationItem>
            <PaginationItem>
              {parseInt(page_id) * 10 + 10 <= totalCount && (
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <Link
                    href={
                      "/players?page_id=" +
                      (parseInt(page_id) + 1) +
                      "&player_name=" +
                      (player_name ? player_name : "") +
                      "&is_starred=" +
                      (is_starred ? is_starred : "")
                    }
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next PAge</span>
                  </Link>
                </Button>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
