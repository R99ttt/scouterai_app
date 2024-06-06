import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

async function getPlayer(playerId) {
  // const players = await prisma.players.findMany({
  //   where: {},
  //   select: {
  //     player_id: true,
  //     id: true,
  //   },
  // });
  // const nation = [];
  // for (let i = 0; i < players.length; i++) {
  //   const element = players[i];
  //   const temp_player = await prisma.temp.findMany({
  //     where: {
  //       player_id: element.player_id,
  //     },
  //     select: {
  //       fifa_version: true,
  //       fifa_update: true,
  //       fifa_update_date: true,
  //       player_positions: true,
  //       nation_position: true,
  //       nation_jersey_number: true,
  //       international_reputation: true,
  //       club_id: true,
  //       club_position: true,
  //       club_jersey_number: true,
  //       club_loaned_from: true,
  //       club_joined_date: true,
  //       club_contract_valid_until_year: true,
  //       release_clause_eur: true,
  //       value_eur: true,
  //       wage_eur: true,
  //     },
  //   });
  //   for (let j = 0; j < temp_player.length; j++) {
  //     temp_player[j].id = element.id;
  //   }
  //   const league_id = await prisma.playerIterations.createMany({
  //     data: temp_player,
  //   });
  // }
}

export default async function Page({ params: { player_id } }) {
  const player = await getPlayer(player_id);
  //   console.log(player);

  return <></>;
}
