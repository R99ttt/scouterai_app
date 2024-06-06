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
          <legend className="-ml-1 px-1 text-2xl font-bold">Add Player</legend>
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

          <div className="grid gap-3">
            <Label htmlFor="playerName">Player Name</Label>
            <Input
              name="long_name"
              id="playerName"
              type="text"
              placeholder="e.g., Rashford..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="fifaVersion">FIFA Version</Label>
            <Input
              name="fifa_version"
              id="fifaVersion"
              type="text"
              placeholder="e.g., FIFA 22"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="fifaUpdate">FIFA Update</Label>
            <Input
              name="fifa_update"
              id="fifaUpdate"
              type="text"
              placeholder="e.g., Summer 2023"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="fifaUpdateDate">FIFA Update Date</Label>
            <Input name="fifa_update_date" id="fifaUpdateDate" type="date" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="nationPosition">Nation Position</Label>
            <Input
              name="nation_position"
              id="nationPosition"
              type="text"
              placeholder="e.g., Forward, Midfielder"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="nationJerseyNumber">Nation Jersey Number</Label>
            <Input
              name="nation_jersey_number"
              id="nationJerseyNumber"
              type="number"
              placeholder="e.g., 10"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="internationalReputation">
              International Reputation
            </Label>
            <Input
              name="international_reputation"
              id="internationalReputation"
              type="number"
              placeholder="e.g., 5"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="clubPosition">Club Position</Label>
            <Input
              name="club_position"
              id="clubPosition"
              type="text"
              placeholder="e.g., Striker, Goalkeeper"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="clubJerseyNumber">Club Jersey Number</Label>
            <Input
              name="club_jersey_number"
              id="clubJerseyNumber"
              type="number"
              placeholder="e.g., 9"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="clubLoanedFrom">Club Loaned From</Label>
            <Input
              name="club_loaned_from"
              id="clubLoanedFrom"
              type="text"
              placeholder="e.g., Real Madrid, Manchester United"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="clubJoinedDate">Club Joined Date</Label>
            <Input name="club_joined_date" id="clubJoinedDate" type="date" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="clubContractValidUntilYear">
              Club Contract Valid Until Year
            </Label>
            <Input
              name="club_contract_valid_until_year"
              id="clubContractValidUntilYear"
              type="number"
              placeholder="e.g., 2025"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="releaseClauseEUR">Release Clause EUR</Label>
            <Input
              name="release_clause_eur"
              id="releaseClauseEUR"
              type="number"
              placeholder="e.g., 1000000"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="valueEUR">Value EUR</Label>
            <Input
              name="value_eur"
              id="valueEUR"
              type="number"
              placeholder="e.g., 500000"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="wageEUR">Wage EUR</Label>
            <Input
              name="wage_eur"
              id="wageEUR"
              type="number"
              placeholder="e.g., 100000"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="overall">Overall</Label>
            <Input
              name="overall"
              id="overall"
              type="number"
              placeholder="e.g., 85"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="potential">Potential</Label>
            <Input
              name="potential"
              id="potential"
              type="number"
              placeholder="e.g., 90"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="pace">Pace</Label>
            <Input name="pace" id="pace" type="number" placeholder="e.g., 88" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input name="dob" id="dob" type="date" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="realFace">Real Face</Label>
            <Input name="real_face" id="realFace" type="checkbox" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="playerFaceUrl">Player Face URL</Label>
            <Input
              name="player_face_url"
              id="playerFaceUrl"
              type="text"
              placeholder="e.g., https://example.com/player-face.jpg"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="work_rate">Work Rate</Label>
            <Input
              name="work_rate"
              id="work_rate"
              type="text"
              placeholder="Enter work rate..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="body_type">Body Type</Label>
            <Input
              name="body_type"
              id="body_type"
              type="text"
              placeholder="Enter body type..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="height_cm">Height (cm)</Label>
            <Input
              name="height_cm"
              id="height_cm"
              type="number"
              placeholder="Enter height in cm..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="weight_kg">Weight (kg)</Label>
            <Input
              name="weight_kg"
              id="weight_kg"
              type="number"
              placeholder="Enter weight in kg..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="player_tags">Player Tags</Label>
            <Input
              name="player_tags"
              id="player_tags"
              type="text"
              placeholder="Enter player tags..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="player_traits">Player Traits</Label>
            <Input
              name="player_traits"
              id="player_traits"
              type="text"
              placeholder="Enter player traits..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="preferred_foot">Preferred Foot</Label>
            <Input
              name="preferred_foot"
              id="preferred_foot"
              type="text"
              placeholder="Enter preferred foot..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="weak_foot">Weak Foot</Label>
            <Input
              name="weak_foot"
              id="weak_foot"
              type="number"
              placeholder="Enter weak foot rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="skill_moves">Skill Moves</Label>
            <Input
              name="skill_moves"
              id="skill_moves"
              type="number"
              placeholder="Enter skill moves rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="age">Age</Label>
            <Input
              name="age"
              id="age"
              type="number"
              placeholder="Enter player's age..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="continent">Continent</Label>
            <Select name="continent_id">
              <SelectTrigger
                id="continent"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a continent" />
              </SelectTrigger>
              <SelectContent>
                {/* Options for continents */}
                {/* You'll populate these options dynamically based on your database */}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="nation">Nation</Label>
            <Select name="nation_id">
              <SelectTrigger
                id="nation"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a nation" />
              </SelectTrigger>
              <SelectContent>
                {/* Options for nations */}
                {/* You'll populate these options dynamically based on the selected continent */}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="league">League</Label>
            <Select name="league_id">
              <SelectTrigger
                id="league"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a league" />
              </SelectTrigger>
              <SelectContent>
                {/* Options for leagues */}
                {/* You'll populate these options dynamically based on the selected nation */}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="club">Club</Label>
            <Select name="club_id">
              <SelectTrigger
                id="club"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a club" />
              </SelectTrigger>
              <SelectContent>
                {/* Options for clubs */}
                {/* You'll populate these options dynamically based on the selected league */}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="overall">Overall Rating</Label>
            <Input
              name="overall"
              id="overall"
              type="number"
              placeholder="Enter overall rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="potential">Potential Rating</Label>
            <Input
              name="potential"
              id="potential"
              type="number"
              placeholder="Enter potential rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="defending">Defending</Label>
            <Input
              name="defending"
              id="defending"
              type="number"
              placeholder="Enter defending rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="physic">Physic</Label>
            <Input
              name="physic"
              id="physic"
              type="number"
              placeholder="Enter physic rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="attacking_crossing">Attacking Crossing</Label>
            <Input
              name="attacking_crossing"
              id="attacking_crossing"
              type="number"
              placeholder="Enter attacking crossing rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="attacking_finishing">Attacking Finishing</Label>
            <Input
              name="attacking_finishing"
              id="attacking_finishing"
              type="number"
              placeholder="Enter attacking finishing rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="skill_dribbling">Skill Dribbling</Label>
            <Input
              name="skill_dribbling"
              id="skill_dribbling"
              type="number"
              placeholder="Enter skill dribbling rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="skill_curve">Skill Curve</Label>
            <Input
              name="skill_curve"
              id="skill_curve"
              type="number"
              placeholder="Enter skill curve rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="skill_fk_accuracy">Skill Free Kick Accuracy</Label>
            <Input
              name="skill_fk_accuracy"
              id="skill_fk_accuracy"
              type="number"
              placeholder="Enter skill free kick accuracy rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="skill_long_passing">Skill Long Passing</Label>
            <Input
              name="skill_long_passing"
              id="skill_long_passing"
              type="number"
              placeholder="Enter skill long passing rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="skill_ball_control">Skill Ball Control</Label>
            <Input
              name="skill_ball_control"
              id="skill_ball_control"
              type="number"
              placeholder="Enter skill ball control rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="defending_marking_awareness">
              Defending Marking Awareness
            </Label>
            <Input
              name="defending_marking_awareness"
              id="defending_marking_awareness"
              type="number"
              placeholder="Enter defending marking awareness rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="defending_standing_tackle">
              Defending Standing Tackle
            </Label>
            <Input
              name="defending_standing_tackle"
              id="defending_standing_tackle"
              type="number"
              placeholder="Enter defending standing tackle rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="defending_sliding_tackle">
              Defending Sliding Tackle
            </Label>
            <Input
              name="defending_sliding_tackle"
              id="defending_sliding_tackle"
              type="number"
              placeholder="Enter defending sliding tackle rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mentality_aggression">Mentality Aggression</Label>
            <Input
              name="mentality_aggression"
              id="mentality_aggression"
              type="number"
              placeholder="Enter mentality aggression rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mentality_interceptions">
              Mentality Interceptions
            </Label>
            <Input
              name="mentality_interceptions"
              id="mentality_interceptions"
              type="number"
              placeholder="Enter mentality interceptions rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mentality_positioning">Mentality Positioning</Label>
            <Input
              name="mentality_positioning"
              id="mentality_positioning"
              type="number"
              placeholder="Enter mentality positioning rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mentality_vision">Mentality Vision</Label>
            <Input
              name="mentality_vision"
              id="mentality_vision"
              type="number"
              placeholder="Enter mentality vision rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mentality_penalties">Mentality Penalties</Label>
            <Input
              name="mentality_penalties"
              id="mentality_penalties"
              type="number"
              placeholder="Enter mentality penalties rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mentality_composure">Mentality Composure</Label>
            <Input
              name="mentality_composure"
              id="mentality_composure"
              type="number"
              placeholder="Enter mentality composure rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="goalkeeping_diving">Goalkeeping Diving</Label>
            <Input
              name="goalkeeping_diving"
              id="goalkeeping_diving"
              type="number"
              placeholder="Enter goalkeeping diving rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="goalkeeping_handling">Goalkeeping Handling</Label>
            <Input
              name="goalkeeping_handling"
              id="goalkeeping_handling"
              type="number"
              placeholder="Enter goalkeeping handling rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="goalkeeping_kicking">Goalkeeping Kicking</Label>
            <Input
              name="goalkeeping_kicking"
              id="goalkeeping_kicking"
              type="number"
              placeholder="Enter goalkeeping kicking rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="goalkeeping_positioning">
              Goalkeeping Positioning
            </Label>
            <Input
              name="goalkeeping_positioning"
              id="goalkeeping_positioning"
              type="number"
              placeholder="Enter goalkeeping positioning rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="goalkeeping_reflexes">Goalkeeping Reflexes</Label>
            <Input
              name="goalkeeping_reflexes"
              id="goalkeeping_reflexes"
              type="number"
              placeholder="Enter goalkeeping reflexes rating..."
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="goalkeeping_speed">Goalkeeping Speed</Label>
            <Input
              name="goalkeeping_speed"
              id="goalkeeping_speed"
              type="number"
              placeholder="Enter goalkeeping speed rating..."
            />
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
