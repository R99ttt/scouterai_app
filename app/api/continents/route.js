import { getContinents } from "@/app/actions/player";
export async function GET(request) {
  try {
    const continents = await getContinents();
    return Response.json(continents);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
