import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Bird, Rabbit, Turtle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <div className="relative flex-col items-center gap-8 md:flex">
      <form className="grid items-start gap-6" action="/players">
        <input type="hidden" value="0" name="page_id" />
        <fieldset className="grid gap-6 content-center rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-2xl font-bold">
            Advanced Search
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="position">Position</Label>
            <Select name="player_club_position">
              <SelectTrigger
                id="position"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItems />
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="playerName">Player Name</Label>
            <Input
              name="player_name"
              id="playerName"
              type="text"
              placeholder="rashford..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="age">Age</Label>
              <Input
                name="player_age"
                id="age"
                type="number"
                placeholder="18"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                name="player_club_name"
                id="clubName"
                type="text"
                placeholder="Manchester united..."
              />
            </div>
          </div>
          <CardFooter>
            <Button className="w-1/2 m-auto">Go!</Button>
          </CardFooter>
        </fieldset>
        {/* <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue="system">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              className="min-h-[9.5rem]"
            />
          </div>
        </fieldset> */}
      </form>
    </div>
  );
}

function SelectItems() {
  return (
    <>
      <SelectItem value="ls">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">ls</span>
            </p>
            <p className="text-xs" data-description>
              Left Striker
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="st">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">st</span>
            </p>
            <p className="text-xs" data-description>
              Right Striker
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lw">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lw</span>
            </p>
            <p className="text-xs" data-description>
              Left Winger
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lf">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lf</span>
            </p>
            <p className="text-xs" data-description>
              Left Forward
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="cf">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">cf</span>
            </p>
            <p className="text-xs" data-description>
              Center Forward
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rf">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rf</span>
            </p>
            <p className="text-xs" data-description>
              Right Forward
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rw">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rw</span>
            </p>
            <p className="text-xs" data-description>
              Right Winger
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lam">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lam</span>
            </p>
            <p className="text-xs" data-description>
              Left Attacking Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="cam">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">cam</span>
            </p>
            <p className="text-xs" data-description>
              Center Attacking Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="ram">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">ram</span>
            </p>
            <p className="text-xs" data-description>
              Right Attacking Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lm</span>
            </p>
            <p className="text-xs" data-description>
              Left Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lcm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lcm</span>
            </p>
            <p className="text-xs" data-description>
              Left Center Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="cm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">cm</span>
            </p>
            <p className="text-xs" data-description>
              Center Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rcm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rcm</span>
            </p>
            <p className="text-xs" data-description>
              Right Center Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rm</span>
            </p>
            <p className="text-xs" data-description>
              Right Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lwb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lwb</span>
            </p>
            <p className="text-xs" data-description>
              Left Wing Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="ldm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">ldm</span>
            </p>
            <p className="text-xs" data-description>
              Left Defensive Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="cdm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">cdm</span>
            </p>
            <p className="text-xs" data-description>
              Center Defensive Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rdm">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rdm</span>
            </p>
            <p className="text-xs" data-description>
              Right Defensive Midfielder
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rwb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rwb</span>
            </p>
            <p className="text-xs" data-description>
              Right Wing Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lb</span>
            </p>
            <p className="text-xs" data-description>
              Left Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="lcb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">lcb</span>
            </p>
            <p className="text-xs" data-description>
              Left Center Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="cb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">cb</span>
            </p>
            <p className="text-xs" data-description>
              Center Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rcb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rcb</span>
            </p>
            <p className="text-xs" data-description>
              Right Center Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="rb">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">rb</span>
            </p>
            <p className="text-xs" data-description>
              Right Back
            </p>
          </div>
        </div>
      </SelectItem>
      <SelectItem value="gk">
        <div className="flex items-start gap-3 text-muted-foreground">
          <div className="grid gap-0.5">
            <p>
              <span className="font-medium text-foreground">gk</span>
            </p>
            <p className="text-xs" data-description>
              Goalkeeper
            </p>
          </div>
        </div>
      </SelectItem>
    </>
  );
}
