import { getLeagues } from "@/app/actions/player";
export async function GET(request) {
  try {
    const leagues = await getLeagues();
    return Response.json(leagues);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
