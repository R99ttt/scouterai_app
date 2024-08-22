"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormState, useFormStatus } from "react-dom";
import { createPlayer } from "@/app/actions/player";
import { useEffect, useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className="w-1/2 m-auto">
      {pending ? "Submitting..." : "Go!"}
    </Button>
  );
}

export default function Page() {
  const [state, action] = useFormState(createPlayer, {});

  const [clubs, setClubs] = useState([]);
  const [nations, setNations] = useState([]);
  const [continents, setContinents] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [chosenLeague, setChosenLeague] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resContinents = await fetch(`/api/continents`);
        const continents = await resContinents.json();
        setContinents(continents);

        const resNations = await fetch(`/api/nations`);
        const nations = await resNations.json();
        setNations(nations);

        const resLeagues = await fetch(`/api/leagues`);
        const leagues = await resLeagues.json();
        setLeagues(leagues);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchClubs = async (chosenLeague) => {
      try {
        const resClubs = await fetch(`/api/clubs?league_id=` + chosenLeague);
        const clubs = await resClubs.json();
        setClubs(clubs);
      } catch (error) {
        console.log(error);
      }
    };
    if (chosenLeague != null) {
      fetchClubs(chosenLeague);
    }
  }, [chosenLeague]);

  return (
    <div className="relative flex-col items-center gap-8 md:flex">
      <form action={action} className="grid items-start gap-6">
        <input type="hidden" value="0" name="page_id" />
        <fieldset className="grid gap-6 content-center rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-2xl font-bold">Add Player</legend>
          <p className="-ml-1 px-1 text-sm font-light">
            can leave some of them empty
          </p>
          <div className="flex items-center">
            <Label htmlFor="club_position">Position</Label>
            {state?.errors?.club_position && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.club_position}
              </span>
            )}
          </div>
          <Select name="club_position" id="club_position">
            <SelectTrigger className="items-start [&_[data-description]]:hidden">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItems />
            </SelectContent>
          </Select>

          <div className="flex items-center">
            <Label htmlFor="long_name">Player Name</Label>
            {state?.errors?.long_name && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.long_name}
              </span>
            )}
          </div>
          <Input
            name="long_name"
            id="long_name"
            type="text"
            placeholder="e.g., Rashford..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="age">Age</Label>
                {state?.errors?.age && (
                  <span className="text-red-400 ml-auto inline-block text-sm">
                    {state.errors.age}
                  </span>
                )}
              </div>
              <Input
                name="age"
                id="age"
                type="number"
                required
                placeholder="e.g., 18"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input name="dob" id="dob" type="date" />
            </div>
          </div>

          <div className="flex items-center">
            <Label htmlFor="league_name">League Name</Label>
          </div>
          <Select
            name="league_name"
            id="league_name"
            onValueChange={(value) => setChosenLeague(value)}
          >
            <SelectTrigger className="items-start [&_[data-description]]:hidden">
              <SelectValue placeholder="Select a league" />
            </SelectTrigger>
            <SelectContent>
              <SelectItemsLeagues leagues={leagues} />
            </SelectContent>
          </Select>
          <div className="flex items-center">
            <Label htmlFor="club_id">Club Name</Label>
          </div>
          <Select name="club_id" id="club_id" required>
            <SelectTrigger className="items-start [&_[data-description]]:hidden">
              <SelectValue
                placeholder={
                  chosenLeague != undefined
                    ? "Select a club"
                    : "Select a league first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItemsClubs clubs={clubs} />
            </SelectContent>
          </Select>

          <div className="flex items-center">
            <Label htmlFor="nation_jersey_number">Nation Jersey Number</Label>
            {state?.errors?.nation_jersey_number && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.nation_jersey_number}
              </span>
            )}
          </div>
          <Input
            name="nation_jersey_number"
            id="nation_jersey_number"
            type="number"
            placeholder="e.g., 10"
          />

          <div className="flex items-center">
            <Label htmlFor="international_reputation">
              International Reputation
            </Label>
            {state?.errors?.international_reputation && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.international_reputation}
              </span>
            )}
          </div>
          <Input
            name="international_reputation"
            id="international_reputation"
            type="number"
            placeholder="e.g., 1-5"
            required
          />

          <div className="flex items-center">
            <Label htmlFor="club_jersey_number">Club Jersey Number</Label>
            {state?.errors?.club_jersey_number && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.club_jersey_number}
              </span>
            )}
          </div>
          <Input
            name="club_jersey_number"
            id="club_jersey_number"
            type="number"
            placeholder="e.g., 9"
          />

          <div className="flex items-center">
            <Label htmlFor="club_joined_date">Club Joined Date</Label>
          </div>
          <Input name="club_joined_date" id="club_joined_date" type="date" />

          <div className="flex items-center">
            <Label htmlFor="club_contract_valid_until_year">
              Club Contract Valid Until Year
            </Label>
          </div>
          <Input
            name="club_contract_valid_until_year"
            id="club_contract_valid_until_year"
            type="number"
            placeholder="e.g., 2025"
          />

          <div className="flex items-center">
            <Label htmlFor="release_clause_eur">Release Clause EUR</Label>
          </div>
          <Input
            name="release_clause_eur"
            id="release_clause_eur"
            type="number"
            placeholder="e.g., 1000000"
          />

          <div className="flex items-center">
            <Label htmlFor="value_eur">Value EUR</Label>
          </div>
          <Input
            name="value_eur"
            id="value_eur"
            type="number"
            placeholder="e.g., 500000"
          />

          <div className="flex items-center">
            <Label htmlFor="wage_eur">Wage EUR</Label>
          </div>
          <Input
            name="wage_eur"
            id="wage_eur"
            type="number"
            placeholder="e.g., 100000"
          />

          <div className="flex items-center">
            <Label htmlFor="pace">Pace</Label>
            {state?.errors?.pace && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.pace}
              </span>
            )}
          </div>
          <Input
            name="pace"
            id="pace"
            type="number"
            placeholder="e.g., 88"
            required
          />

          <div className="flex items-center">
            <Label htmlFor="shooting">shooting</Label>
            {state?.errors?.shooting && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.shooting}
              </span>
            )}
          </div>
          <Input
            name="shooting"
            id="shooting"
            type="number"
            placeholder="e.g., 88"
            required
          />

          <div className="flex items-center">
            <Label htmlFor="work_rate">Work Rate</Label>
          </div>
          <Input
            name="work_rate"
            id="work_rate"
            type="text"
            placeholder="Enter work rate..."
          />

          <div className="flex items-center">
            <Label htmlFor="body_type">Body Type</Label>
          </div>
          <Input
            name="body_type"
            id="body_type"
            type="text"
            placeholder="Enter body type..."
          />

          <div className="flex items-center">
            <Label htmlFor="height_cm">Height (cm)</Label>
          </div>
          <Input
            name="height_cm"
            id="height_cm"
            type="number"
            placeholder="Enter height in cm..."
          />

          <div className="flex items-center">
            <Label htmlFor="weight_kg">Weight (kg)</Label>
          </div>
          <Input
            name="weight_kg"
            id="weight_kg"
            type="number"
            placeholder="Enter weight in kg..."
          />

          <div className="flex items-center">
            <Label htmlFor="player_tags">Player Tags</Label>
          </div>
          <Input
            name="player_tags"
            id="player_tags"
            type="text"
            placeholder="Enter player tags..."
          />

          <div className="flex items-center">
            <Label htmlFor="player_traits">Player Traits</Label>
          </div>
          <Input
            name="player_traits"
            id="player_traits"
            type="text"
            placeholder="Enter player traits..."
          />

          <div className="flex items-center">
            <Label htmlFor="preferred_foot">Preferred Foot</Label>
          </div>
          <Input
            name="preferred_foot"
            id="preferred_foot"
            type="text"
            placeholder="Enter preferred foot..."
          />

          <div className="flex items-center">
            <Label htmlFor="weak_foot">Weak Foot</Label>
            {state?.errors?.weak_foot && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.weak_foot}
              </span>
            )}
          </div>
          <Input
            name="weak_foot"
            id="weak_foot"
            type="number"
            placeholder="Enter weak foot rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="skill_moves">Skill Moves</Label>
            {state?.errors?.skill_moves && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.skill_moves}
              </span>
            )}
          </div>
          <Input
            name="skill_moves"
            id="skill_moves"
            type="number"
            placeholder="e.g, 1-5"
            required
          />

          <div className="flex items-center">
            <Label htmlFor="defending">Defending</Label>
            {state?.errors?.defending && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.defending}
              </span>
            )}
          </div>
          <Input
            name="defending"
            id="defending"
            type="number"
            required
            placeholder="Enter defending rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="physic">Physic</Label>
            {state?.errors?.physic && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.physic}
              </span>
            )}
          </div>
          <Input
            name="physic"
            id="physic"
            type="number"
            placeholder="Enter physic rating..."
            required
          />

          <div className="flex items-center">
            <Label htmlFor="attacking_crossing">Attacking Crossing</Label>
            {state?.errors?.attacking_crossing && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.attacking_crossing}
              </span>
            )}
          </div>
          <Input
            name="attacking_crossing"
            id="attacking_crossing"
            type="number"
            placeholder="Enter attacking crossing rating..."
            required
          />

          <div className="flex items-center">
            <Label htmlFor="attacking_finishing">Attacking Finishing</Label>
          </div>
          <Input
            name="attacking_finishing"
            id="attacking_finishing"
            type="number"
            placeholder="Enter attacking finishing rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="skill_dribbling">Skill Dribbling</Label>
            {state?.errors?.skill_dribbling && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.skill_dribbling}
              </span>
            )}
          </div>
          <Input
            name="skill_dribbling"
            id="skill_dribbling"
            type="number"
            required
            placeholder="Enter skill dribbling rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="skill_curve">Skill Curve</Label>
            {state?.errors?.skill_curve && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.skill_curve}
              </span>
            )}
          </div>
          <Input
            name="skill_curve"
            id="skill_curve"
            type="number"
            placeholder="Enter skill curve rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="skill_fk_accuracy">Skill Free Kick Accuracy</Label>
            {state?.errors?.skill_fk_accuracy && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.skill_fk_accuracy}
              </span>
            )}
          </div>
          <Input
            name="skill_fk_accuracy"
            id="skill_fk_accuracy"
            type="number"
            placeholder="Enter skill free kick accuracy rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="skill_long_passing">Skill Long Passing</Label>
            {state?.errors?.skill_long_passing && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.skill_long_passing}
              </span>
            )}
          </div>
          <Input
            name="skill_long_passing"
            id="skill_long_passing"
            type="number"
            placeholder="Enter skill long passing rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="attacking_short_passing">
              Attacking Short Passing
            </Label>
            {state?.errors?.attacking_short_passing && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.attacking_short_passing}
              </span>
            )}
          </div>
          <Input
            name="attacking_short_passing"
            id="attacking_short_passing"
            type="number"
            placeholder="Attacking Short Passing rating..."
            required
          />

          <div className="flex items-center">
            <Label htmlFor="passing">Passing</Label>
            {state?.errors?.passing && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.passing}
              </span>
            )}
          </div>
          <Input
            name="passing"
            id="passing"
            type="number"
            placeholder="Passing rating..."
            required
          />

          <div className="flex items-center">
            <Label htmlFor="skill_ball_control">Skill Ball Control</Label>
            {state?.errors?.skill_ball_control && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.skill_ball_control}
              </span>
            )}
          </div>
          <Input
            name="skill_ball_control"
            id="skill_ball_control"
            type="number"
            placeholder="Enter skill ball control rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="defending_marking_awareness">
              Defending Marking Awareness
            </Label>
            {state?.errors?.defending_marking_awareness && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.defending_marking_awareness}
              </span>
            )}
          </div>
          <Input
            name="defending_marking_awareness"
            id="defending_marking_awareness"
            type="number"
            placeholder="Enter defending marking awareness rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="defending_standing_tackle">
              Defending Standing Tackle
            </Label>
            {state?.errors?.defending_standing_tackle && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.defending_standing_tackle}
              </span>
            )}
          </div>
          <Input
            name="defending_standing_tackle"
            id="defending_standing_tackle"
            type="number"
            placeholder="Enter defending standing tackle rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="defending_sliding_tackle">
              Defending Sliding Tackle
            </Label>
            {state?.errors?.defending_sliding_tackle && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.defending_sliding_tackle}
              </span>
            )}
          </div>
          <Input
            name="defending_sliding_tackle"
            id="defending_sliding_tackle"
            type="number"
            placeholder="Enter defending sliding tackle rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="mentality_aggression">Mentality Aggression</Label>
            {state?.errors?.mentality_aggression && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.mentality_aggression}
              </span>
            )}
          </div>
          <Input
            name="mentality_aggression"
            id="mentality_aggression"
            type="number"
            placeholder="Enter mentality aggression rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="mentality_interceptions">
              Mentality Interceptions
            </Label>
            {state?.errors?.mentality_interceptions && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.mentality_interceptions}
              </span>
            )}
          </div>
          <Input
            name="mentality_interceptions"
            id="mentality_interceptions"
            type="number"
            placeholder="Enter mentality interceptions rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="mentality_positioning">Mentality Positioning</Label>
            {state?.errors?.mentality_positioning && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.mentality_positioning}
              </span>
            )}
          </div>
          <Input
            name="mentality_positioning"
            id="mentality_positioning"
            type="number"
            placeholder="Enter mentality positioning rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="mentality_vision">Mentality Vision</Label>
            {state?.errors?.mentality_vision && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.mentality_vision}
              </span>
            )}
          </div>
          <Input
            name="mentality_vision"
            id="mentality_vision"
            type="number"
            placeholder="Enter mentality vision rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="mentality_penalties">Mentality Penalties</Label>
            {state?.errors?.mentality_penalties && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.mentality_penalties}
              </span>
            )}
          </div>
          <Input
            name="mentality_penalties"
            id="mentality_penalties"
            type="number"
            placeholder="Enter mentality penalties rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="mentality_composure">Mentality Composure</Label>
            {state?.errors?.mentality_composure && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.mentality_composure}
              </span>
            )}
          </div>
          <Input
            name="mentality_composure"
            id="mentality_composure"
            type="number"
            placeholder="Enter mentality composure rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="goalkeeping_diving">Goalkeeping Diving</Label>
            {state?.errors?.goalkeeping_diving && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.goalkeeping_diving}
              </span>
            )}
          </div>
          <Input
            name="goalkeeping_diving"
            id="goalkeeping_diving"
            type="number"
            placeholder="Enter goalkeeping diving rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="goalkeeping_handling">Goalkeeping Handling</Label>
            {state?.errors?.goalkeeping_handling && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.goalkeeping_handling}
              </span>
            )}
          </div>
          <Input
            name="goalkeeping_handling"
            id="goalkeeping_handling"
            type="number"
            placeholder="Enter goalkeeping handling rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="goalkeeping_kicking">Goalkeeping Kicking</Label>
            {state?.errors?.goalkeeping_kicking && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.goalkeeping_kicking}
              </span>
            )}
          </div>
          <Input
            name="goalkeeping_kicking"
            id="goalkeeping_kicking"
            type="number"
            placeholder="Enter goalkeeping kicking rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="goalkeeping_positioning">
              Goalkeeping Positioning
            </Label>
            {state?.errors?.goalkeeping_positioning && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.goalkeeping_positioning}
              </span>
            )}
          </div>
          <Input
            name="goalkeeping_positioning"
            id="goalkeeping_positioning"
            type="number"
            placeholder="Enter goalkeeping positioning rating..."
            required
          />

          <div className="flex items-center">
            <Label htmlFor="goalkeeping_reflexes">Goalkeeping Reflexes</Label>
            {state?.errors?.goalkeeping_reflexes && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.goalkeeping_reflexes}
              </span>
            )}
          </div>
          <Input
            name="goalkeeping_reflexes"
            id="goalkeeping_reflexes"
            type="number"
            placeholder="Enter goalkeeping reflexes rating..."
          />

          <div className="flex items-center">
            <Label htmlFor="goalkeeping_speed">Goalkeeping Speed</Label>
            {state?.errors?.goalkeeping_speed && (
              <span className="text-red-400 ml-auto inline-block text-sm">
                {state.errors.goalkeeping_speed}
              </span>
            )}
          </div>
          <Input
            name="goalkeeping_speed"
            id="goalkeeping_speed"
            type="number"
            placeholder="Enter goalkeeping speed rating..."
          />

          <CardFooter>
            <SubmitButton />
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

function SelectItemsClubs({ clubs }) {
  return (
    <>
      {clubs?.map((club) => {
        return (
          <SelectItem key={club?.id} value={club?.id.toString()}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p>
                  <span className="font-medium text-foreground">
                    {club?.name}
                  </span>
                </p>
                <p className="text-xs" data-description>
                  {club?.league.name}
                </p>
              </div>
            </div>
          </SelectItem>
        );
      })}
    </>
  );
}

function SelectItemsLeagues({ leagues }) {
  return (
    <>
      {leagues?.map((league) => {
        return (
          <SelectItem key={league?.id} value={league?.id.toString()}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p>
                  <span className="font-medium text-foreground">
                    {league?.name}
                  </span>
                </p>
                <p className="text-xs" data-description>
                  {league?.nations?.name}
                </p>
              </div>
            </div>
          </SelectItem>
        );
      })}
    </>
  );
}

function SelectItemsNations({ nations }) {
  return (
    <>
      {nations?.map((nation) => {
        return (
          <SelectItem value={nation?.id}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p>
                  <span className="font-medium text-foreground">
                    {nation?.name}
                  </span>
                </p>
                <p className="text-xs" data-description>
                  {nation?.continent.name}
                </p>
              </div>
            </div>
          </SelectItem>
        );
      })}
    </>
  );
}
