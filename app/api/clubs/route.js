import { getClubs } from "@/app/actions/player";
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const league_id = searchParams.get("league_id");
    const clubs = await getClubs(league_id);
    return Response.json(clubs);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
