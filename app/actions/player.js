"use server";
import { redirect } from "next/navigation";
import { getSessionDetails } from "../lib/session";
import prisma from "@/app/lib/prisma";

export async function trackPlayer(playerId) {
  const { userId } = await getSessionDetails();
  try {
    await prisma.playerUser.create({
      data: {
        player: {
          connect: { id: parseInt(playerId) },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return { errors: { main: "An error occurred" } };
  }
}

export async function untrackPlayer(playerId) {
  const { userId } = await getSessionDetails();
  try {
    await prisma.playerUser.deleteMany({
      where: {
        playerId: parseInt(playerId),
        userId: userId,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return { errors: { main: "An error occurred" } };
  }
}

export async function createPlayer(state, formData) {
  const errors = await validatePlayerForm(formData);
  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return {
      ...errors,
    };
  }

  const dataForOverallPrediction = {
    Age: formData.get("age") ? parseInt(formData.get("age")) : null,
    "International Reputation": formData.get("international_reputation")
      ? parseInt(formData.get("international_reputation"))
      : null,
    Dribbling: formData.get("skill_dribbling")
      ? parseInt(formData.get("skill_dribbling"))
      : null,
    "Skill Moves": formData.get("skill_moves")
      ? parseInt(formData.get("skill_moves"))
      : null,
    Pace: formData.get("pace") ? parseInt(formData.get("pace")) : null,
    Shooting: formData.get("shooting")
      ? parseInt(formData.get("shooting"))
      : null,
    Passing: formData.get("passing") ? parseInt(formData.get("passing")) : null,
    Defending: formData.get("defending")
      ? parseInt(formData.get("defending"))
      : null,
    Physic: formData.get("physic") ? parseInt(formData.get("physic")) : null,
  };

  let modelOverall, modelPotential;
  try {
    const overallResponse = await fetch("http://localhost:5000/overall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForOverallPrediction),
    });
    const overallData = await overallResponse.json();
    modelOverall = Math.round(overallData.predicted_overall);
    console.log(modelOverall);

    const dataForPotentialPrediction = {
      Overall: Math.round(modelOverall),
      Age: formData.get("age") ? parseInt(formData.get("age")) : null,
      Crossing: formData.get("attacking_crossing")
        ? parseInt(formData.get("attacking_crossing"))
        : null,
      ShortPassing: formData.get("attacking_short_passing")
        ? parseInt(formData.get("attacking_short_passing"))
        : null,
      GKPositioning: formData.get("goalkeeping_positioning")
        ? parseInt(formData.get("goalkeeping_positioning"))
        : null,
    };

    // Fetch model_potential from Python service
    const potentialResponse = await fetch("http://localhost:5000/potential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForPotentialPrediction),
    });
    const potentialData = await potentialResponse.json();
    modelPotential = potentialData.predicted_potential;
    console.log(modelPotential);
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return {
      errors: {
        main: "An error occurred while predicting the player's ratings.",
      },
    };
  }

  let player;
  try {
    // Create the main player record with model_overall and model_potential
    player = await prisma.players.create({
      data: {
        short_name: formData.get("short_name") || null,
        long_name: formData.get("long_name") || null,
        dob: formData.get("dob") ? new Date(formData.get("dob")) : null,
        nationality: formData.get("nationality_id")
          ? { connect: { id: parseInt(formData.get("nationality_id")) } }
          : undefined,
        player_url: formData.get("player_url") || null,
        player_face_url: formData.get("player_face_url") || null,
        real_face: formData.get("real_face") === "true" ? true : false,
        player_iterations: {
          create: {
            fifa_version: formData.get("fifa_version") || null,
            temp_id: 0, // Assuming temp_id is automatically generated
            fifa_update: formData.get("fifa_update") || null,
            fifa_update_date: formData.get("fifa_update_date")
              ? new Date(formData.get("fifa_update_date"))
              : null,
            player_positions: formData.get("player_positions") || null,
            nation_position: formData.get("nation_position") || null,
            nation_jersey_number: formData.get("nation_jersey_number")
              ? parseInt(formData.get("nation_jersey_number"))
              : null,
            international_reputation: formData.get("international_reputation")
              ? parseInt(formData.get("international_reputation"))
              : null,
            club: formData.get("club_id")
              ? { connect: { id: parseInt(formData.get("club_id")) } }
              : undefined,
            club_position: formData.get("club_position") || null,
            club_jersey_number: formData.get("club_jersey_number")
              ? parseInt(formData.get("club_jersey_number"))
              : null,
            club_loaned_from: formData.get("club_loaned_from") || null,
            club_joined_date: formData.get("club_joined_date")
              ? new Date(formData.get("club_joined_date"))
              : null,
            club_contract_valid_until_year: formData.get(
              "club_contract_valid_until_year"
            )
              ? parseInt(formData.get("club_contract_valid_until_year"))
              : null,
            release_clause_eur: formData.get("release_clause_eur")
              ? parseInt(formData.get("release_clause_eur"))
              : null,
            value_eur: formData.get("value_eur")
              ? parseInt(formData.get("value_eur"))
              : null,
            wage_eur: formData.get("wage_eur")
              ? parseInt(formData.get("wage_eur"))
              : null,
            player_attributes: {
              create: {
                work_rate: formData.get("work_rate") || null,
                body_type: formData.get("body_type") || null,
                height_cm: formData.get("height_cm")
                  ? parseInt(formData.get("height_cm"))
                  : null,
                weight_kg: formData.get("weight_kg")
                  ? parseInt(formData.get("weight_kg"))
                  : null,
                player_tags: formData.get("player_tags") || null,
                player_traits: formData.get("player_traits") || null,
                preferred_foot: formData.get("preferred_foot") || null,
                weak_foot: formData.get("weak_foot")
                  ? parseInt(formData.get("weak_foot"))
                  : null,
                skill_moves: formData.get("skill_moves")
                  ? parseInt(formData.get("skill_moves"))
                  : null,
                age: formData.get("age") ? parseInt(formData.get("age")) : null,
              },
            },
            player_ratings: {
              create: {
                model_overall: modelOverall || null,
                model_potential: modelPotential || null,
                pace: formData.get("pace")
                  ? parseInt(formData.get("pace"))
                  : null,
                shooting: formData.get("shooting")
                  ? parseInt(formData.get("shooting"))
                  : null,
                passing: formData.get("passing")
                  ? parseInt(formData.get("passing"))
                  : null,
                dribbling: formData.get("dribbling")
                  ? parseInt(formData.get("dribbling"))
                  : null,
                defending: formData.get("defending")
                  ? parseInt(formData.get("defending"))
                  : null,
                physic: formData.get("physic")
                  ? parseInt(formData.get("physic"))
                  : null,
                attacking_crossing: formData.get("attacking_crossing")
                  ? parseInt(formData.get("attacking_crossing"))
                  : null,
                attacking_finishing: formData.get("attacking_finishing")
                  ? parseInt(formData.get("attacking_finishing"))
                  : null,
                attacking_heading_accuracy: formData.get(
                  "attacking_heading_accuracy"
                )
                  ? parseInt(formData.get("attacking_heading_accuracy"))
                  : null,
                attacking_short_passing: formData.get("attacking_short_passing")
                  ? parseInt(formData.get("attacking_short_passing"))
                  : null,
                attacking_volleys: formData.get("attacking_volleys")
                  ? parseInt(formData.get("attacking_volleys"))
                  : null,
                skill_dribbling: formData.get("skill_dribbling")
                  ? parseInt(formData.get("skill_dribbling"))
                  : null,
                skill_curve: formData.get("skill_curve")
                  ? parseInt(formData.get("skill_curve"))
                  : null,
                skill_fk_accuracy: formData.get("skill_fk_accuracy")
                  ? parseInt(formData.get("skill_fk_accuracy"))
                  : null,
                skill_long_passing: formData.get("skill_long_passing")
                  ? parseInt(formData.get("skill_long_passing"))
                  : null,
                skill_ball_control: formData.get("skill_ball_control")
                  ? parseInt(formData.get("skill_ball_control"))
                  : null,
                movement_acceleration: formData.get("movement_acceleration")
                  ? parseInt(formData.get("movement_acceleration"))
                  : null,
                movement_sprint_speed: formData.get("movement_sprint_speed")
                  ? parseInt(formData.get("movement_sprint_speed"))
                  : null,
                movement_agility: formData.get("movement_agility")
                  ? parseInt(formData.get("movement_agility"))
                  : null,
                movement_reactions: formData.get("movement_reactions")
                  ? parseInt(formData.get("movement_reactions"))
                  : null,
                movement_balance: formData.get("movement_balance")
                  ? parseInt(formData.get("movement_balance"))
                  : null,
                power_shot_power: formData.get("power_shot_power")
                  ? parseInt(formData.get("power_shot_power"))
                  : null,
                power_jumping: formData.get("power_jumping")
                  ? parseInt(formData.get("power_jumping"))
                  : null,
                power_stamina: formData.get("power_stamina")
                  ? parseInt(formData.get("power_stamina"))
                  : null,
                power_strength: formData.get("power_strength")
                  ? parseInt(formData.get("power_strength"))
                  : null,
                power_long_shots: formData.get("power_long_shots")
                  ? parseInt(formData.get("power_long_shots"))
                  : null,
                mentality_aggression: formData.get("mentality_aggression")
                  ? parseInt(formData.get("mentality_aggression"))
                  : null,
                mentality_interceptions: formData.get("mentality_interceptions")
                  ? parseInt(formData.get("mentality_interceptions"))
                  : null,
                mentality_positioning: formData.get("mentality_positioning")
                  ? parseInt(formData.get("mentality_positioning"))
                  : null,
                mentality_vision: formData.get("mentality_vision")
                  ? parseInt(formData.get("mentality_vision"))
                  : null,
                mentality_penalties: formData.get("mentality_penalties")
                  ? parseInt(formData.get("mentality_penalties"))
                  : null,
                mentality_composure: formData.get("mentality_composure")
                  ? parseInt(formData.get("mentality_composure"))
                  : null,
                defending_marking_awareness: formData.get(
                  "defending_marking_awareness"
                )
                  ? parseInt(formData.get("defending_marking_awareness"))
                  : null,
                defending_standing_tackle: formData.get(
                  "defending_standing_tackle"
                )
                  ? parseInt(formData.get("defending_standing_tackle"))
                  : null,
                defending_sliding_tackle: formData.get(
                  "defending_sliding_tackle"
                )
                  ? parseInt(formData.get("defending_sliding_tackle"))
                  : null,
                goalkeeping_diving: formData.get("goalkeeping_diving")
                  ? parseInt(formData.get("goalkeeping_diving"))
                  : null,
                goalkeeping_handling: formData.get("goalkeeping_handling")
                  ? parseInt(formData.get("goalkeeping_handling"))
                  : null,
                goalkeeping_kicking: formData.get("goalkeeping_kicking")
                  ? parseInt(formData.get("goalkeeping_kicking"))
                  : null,
                goalkeeping_positioning: formData.get("goalkeeping_positioning")
                  ? parseInt(formData.get("goalkeeping_positioning"))
                  : null,
                goalkeeping_reflexes: formData.get("goalkeeping_reflexes")
                  ? parseInt(formData.get("goalkeeping_reflexes"))
                  : null,
                goalkeeping_speed: formData.get("goalkeeping_speed")
                  ? parseInt(formData.get("goalkeeping_speed"))
                  : null,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return { errors: { main: "An error occurred while creating the player." } };
  }

  // redirect("/players/" + player.id);
}

export async function validatePlayerForm(formData) {
  const errors = {};

  // Helper function to validate number ranges
  const validateNumberInRange = (name, value, min, max) => {
    if (value !== "" && (value < min || value > max)) {
      errors[name] = `Must be between ${min} and ${max}`;
    }
  };

  // Required fields
  const requiredFields = [
    "club_position",
    "club_id",
    "long_name",
    "age",
    "attacking_crossing",
    "attacking_short_passing",
    "goalkeeping_positioning",
    "physic",
    "defending",
    "passing",
    "shooting",
    "pace",
    "skill_moves",
    "skill_dribbling",
    "international_reputation",
  ];

  requiredFields.forEach((field) => {
    if (!formData.get(field)) {
      errors[field] = "This field is required";
    }
  });

  // Validate specific fields with additional rules
  const age = formData.get("age");
  if (age && (age < 15 || age > 50)) {
    errors.age = "Age must be between 15 and 45";
  }

  const nationJerseyNumber = formData.get("nation_jersey_number");
  validateNumberInRange("nation_jersey_number", nationJerseyNumber, 1, 99);

  const internationalReputation = formData.get("international_reputation");
  validateNumberInRange(
    "international_reputation",
    internationalReputation,
    1,
    5
  );

  const clubJerseyNumber = formData.get("club_jersey_number");
  validateNumberInRange("club_jersey_number", clubJerseyNumber, 1, 99);

  const weakFoot = formData.get("weak_foot");
  validateNumberInRange("weak_foot", weakFoot, 1, 5);

  const skillMoves = formData.get("skill_moves");
  validateNumberInRange("skill_moves", skillMoves, 1, 5);

  // Validate rating fields
  const ratingFields = [
    "pace",
    "defending",
    "physic",
    "attacking_crossing",
    "attacking_finishing",
    "skill_dribbling",
    "skill_curve",
    "skill_fk_accuracy",
    "skill_long_passing",
    "attacking_short_passing",
    "skill_ball_control",
    "defending_marking_awareness",
    "defending_standing_tackle",
    "defending_sliding_tackle",
    "mentality_aggression",
    "mentality_interceptions",
    "mentality_positioning",
    "mentality_vision",
    "mentality_penalties",
    "mentality_composure",
    "goalkeeping_diving",
    "goalkeeping_handling",
    "goalkeeping_kicking",
    "goalkeeping_positioning",
    "goalkeeping_reflexes",
    "goalkeeping_speed",
    "shooting",
    "passing",
  ];

  ratingFields.forEach((field) => {
    const value = formData.get(field);
    validateNumberInRange(field, value, 1, 99);
  });

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {};
}

export async function getClubs(league_id) {
  try {
    const clubs = await prisma.club.findMany({
      where: {
        league_id: parseInt(league_id),
      },
      select: {
        id: true,
        name: true,
        league: {
          select: {
            name: true,
          },
        },
      },
    });
    return clubs;
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw new Error("Could not retrieve clubs");
  }
}

export async function getNations() {
  try {
    const nations = await prisma.nation.findMany({
      select: {
        id: true,
        name: true,
        continent: {
          select: {
            name: true,
          },
        },
      },
    });
    return nations;
  } catch (error) {
    console.error("Error fetching nations:", error);
    throw new Error("Could not retrieve nations");
  }
}

export async function getLeagues() {
  try {
    const leagues = await prisma.league.findMany({
      select: {
        id: true,
        name: true,
        level: true,
        nations: {
          select: {
            name: true,
          },
        },
      },
    });
    return leagues;
  } catch (error) {
    console.error("Error fetching leagues:", error);
    throw new Error("Could not retrieve leagues");
  }
}

export async function getContinents() {
  try {
    const continents = await prisma.continent.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return continents;
  } catch (error) {
    console.error("Error fetching continents:", error);
    throw new Error("Could not retrieve continents");
  }
}
