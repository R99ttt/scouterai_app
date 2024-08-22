import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { getSessionDetails } from "@/app/lib/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import TrackPlayerButton from "./TrackPlayerButton";

async function getPlayer(playerId, userId) {
  return await prisma.players.findUnique({
    where: {
      id: parseInt(playerId), // The specific player ID you are looking for
    },
    include: {
      player_iterations: {
        orderBy: {
          player_attributes: {
            age: "desc",
          },
        },
        take: 1,
        include: {
          club: {
            include: {
              league: true,
            },
          }, // Include club details
          player_attributes: true, // Include player attributes
          player_ratings: true,
        },
      },
      nationality: true,
      users: userId
        ? {
            where: {
              userId: parseInt(userId),
            },
            select: {
              userId: true,
            },
          }
        : undefined,
    },
  });
}

export default async function Page({ params: { player_id } }) {
  const sessionDetails = await getSessionDetails();

  const player = await getPlayer(player_id, sessionDetails?.userId);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Avatar className="h-24 w-24">
                <AvatarImage src={player?.player_face_url} alt="@face" />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {player?.short_name || player?.long_name},{" "}
              {player.player_iterations[0]?.player_attributes.age}
            </div>
            <p className="text-xs text-muted-foreground">
              {player?.nationality_name}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Machine overall</p>
            <div className="text-2xl font-bold">
              {player.player_iterations[0]?.player_ratings.model_overall}
            </div>
            {player.player_iterations[0]?.player_ratings.overall && (
              <p className="text-xs text-muted-foreground">
                FIFA overall -{" "}
                {player.player_iterations[0]?.player_ratings.overall}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Machine potential -{" "}
              <span
                className={
                  "font-bold " +
                  (player.player_iterations[0]?.player_ratings
                    .model_potential == "Great"
                    ? "text-green-600"
                    : player.player_iterations[0]?.player_ratings
                        .model_potential == "Good"
                    ? "text-lime-300"
                    : player.player_iterations[0]?.player_ratings
                        .model_potential == "Medium"
                    ? "text-yellow-400"
                    : "text-orange-500")
                }
              >
                {player.player_iterations[0]?.player_ratings.model_potential}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Club</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {player.player_iterations[0]?.club.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {player.player_iterations[0]?.club.league?.name}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {player.player_iterations[0]?.club_position}
            </div>
            <p className="text-xs text-muted-foreground">
              {player.player_iterations[0]?.player_positions}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Stats</CardTitle>
              <CardDescription>Detailed Stats.</CardDescription>
            </div>
            {/* <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attacking</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Movement
                  </TableHead>
                  <TableHead>Power</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          ?.attacking_crossing
                      }
                    </Badge>
                    crossing
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          ?.skill_dribbling
                      }
                    </Badge>
                    Dribbling
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          ?.movement_acceleration
                      }
                    </Badge>
                    Acceleration
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          ?.power_shot_power
                      }
                    </Badge>
                    Shot power
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          ?.attacking_finishing
                      }
                    </Badge>
                    Finishing
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {player.player_iterations[0]?.player_ratings.skill_curve}
                    </Badge>
                    Curve
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          .movement_sprint_speed
                      }
                    </Badge>
                    Sprint speed
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          .power_jumping
                      }
                    </Badge>
                    Jumping
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          .attacking_heading_accuracy
                      }
                    </Badge>
                    Heading accuracy
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          .skill_dribbling
                      }
                    </Badge>
                    FK Accuracy
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          .movement_agility
                      }
                    </Badge>
                    Agility
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {
                        player.player_iterations[0]?.player_ratings
                          .power_stamina
                      }
                    </Badge>
                    Stamina
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {player?.long_name}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {/* <Copy className="h-3 w-3" /> */}
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>
                {player.player_iterations[0]?.player_attributes?.player_tags}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {sessionDetails?.userId ? (
                <TrackPlayerButton
                  playerId={player?.id}
                  isFollowing={player?.users?.length > 0}
                />
              ) : (
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Link
                    href={"/auth/signin"}
                    className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"
                  >
                    Track Player
                  </Link>
                </Button>
              )}
              {/* {sessionDetails?.isScouter && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )} */}
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Player Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Player Value</span>
                  <span>{player.player_iterations[0]?.value_eur} eur</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Player Wage</span>
                  <span>{player.player_iterations[0]?.wage_eur} eur</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Birth Date</span>
                  <span>{player?.dob?.toDateString()}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Height</span>
                  <span>
                    {player.player_iterations[0]?.player_attributes.height_cm}{" "}
                    cm
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span>
                    {player.player_iterations[0]?.player_attributes.weight_kg}{" "}
                    kg
                  </span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Age</span>
                  <span>
                    {player.player_iterations[0]?.player_attributes.age}
                  </span>
                </li>
              </ul>
            </div>
            {/* <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>Liam Johnson</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">liam@acme.com</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">+1 234 567 890</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div> */}
          </CardContent>
          {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter> */}
        </Card>
      </div>
    </>
  );
}
