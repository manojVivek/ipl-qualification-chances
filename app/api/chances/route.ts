import { NextRequest, NextResponse } from "next/server";
import { computeChance } from "./cache";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const teamID = searchParams.get("team");
  console.log("GET /api/chances", teamID);

  if (teamID == null || teamID === "") {
    // Return a 400 Bad Request response if the team query parameter is missing
    return NextResponse.json({
      status: 400,
      body: {
        error: "Missing required query parameter",
      },
    });
  }

  const chances = computeChance(teamID);

  return Response.json(chances ?? {});
}
