import { getNations } from "@/app/actions/player";
export async function GET(request) {
  try {
    const nations = await getNations();
    return Response.json(nations);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
