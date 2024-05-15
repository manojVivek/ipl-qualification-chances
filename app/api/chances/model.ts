export interface Points {
  TeamCode: string;
  Loss: number;
  Draw: number;
  Wins: number;
  Points: number;
  NetRunRate: number;
}

export interface Match {
  SecondBattingTeamCode: string;
  FirstBattingTeamCode: string;
  AwayTeamColor1: string;
  HomeTeamColor1: string;
  GroundName: string;
  GMTMatchDate: string;
  GMTMatchTime: string;
  RowNo: number;
  City: string;
}

export type MatchOutcome = Match & {
  winner: string;
  loser: string;
  result: "WINNER" | "DRAW";
  WinnerNRRChange: number;
  LoserNRRChange: number;
};

export interface TeamResult {
  count: number;
  percentage?: number;
  posibilities: Array<{
    points: Points[];
    outcome: MatchOutcome[];
  }>;
}

export const computeCombinations = async (
  points: Points[],
  upcomingSchedule: Match[]
): Promise<Record<string, TeamResult>> => {
  //   console.log("points", points);
  //   console.log("upcomingSchedule", upcomingSchedule);

  const outcomes = upcomingSchedule.map(getPossibleOutcomes);

  const combos = await combinations(outcomes);

  const totalCombos = combos.length;

  console.log("result", combos.length);

  const output: Record<string, TeamResult> = {};

  for (const timeline of combos) {
    // compute the points
    const currentPoints = structuredClone(points);
    for (const match of timeline) {
      if (match.result === "DRAW") {
        // both teams get 1 point
        // @ts-expect-error
        currentPoints.find(
          (point) => point.TeamCode === match.FirstBattingTeamCode
        ).Points += 1;
        // @ts-expect-error
        currentPoints.find(
          (point) => point.TeamCode === match.SecondBattingTeamCode
        ).Points += 1;
      }
      if (match.result === "WINNER") {
        const winner = currentPoints.find(
          (point) => point.TeamCode === match.winner
        ) as Points;

        winner.Points += 2;
        winner.NetRunRate += match.WinnerNRRChange;

        const loser = currentPoints.find(
          (point) => point.TeamCode === match.loser
        ) as Points;

        loser.NetRunRate += match.LoserNRRChange;
      }
    }

    sortPointsTable(currentPoints);

    // get top 4 teams
    const qualifyingTeams = qualifyingTeamsInPointsTable(currentPoints);
    for (const team of qualifyingTeams) {
      if (output[team] === undefined) {
        output[team] = {
          count: 1,
          posibilities: [
            {
              points: currentPoints,
              outcome: timeline,
            },
          ],
        };
      } else {
        output[team].count += 1;
        output[team].posibilities.push({
          points: currentPoints,
          outcome: timeline,
        });
      }
    }
  }

  for (const team of Object.keys(output)) {
    output[team].percentage = (output[team].count / totalCombos) * 100;
    output[team].posibilities = output[team].posibilities.sort((a, b) => {
      return (
        a.points.findIndex((points) => points.TeamCode === team) -
        b.points.findIndex((points) => points.TeamCode === team)
      );
    });
  }

  console.log("Possible different outcomes", totalCombos);
  console.log("Team\t% Chance\tPossibilities");
  for (const team of Object.keys(output)) {
    console.log(
      `${team}\t${output[team]?.percentage?.toPrecision(2)}%\t${
        output[team]?.count
      }`
    );
  }

  return output;
};

function sortPointsTable(points: Points[]): Points[] {
  return points.sort((a, b) => {
    if (a.Points !== b.Points) {
      return b.Points - a.Points;
    }
    return b.NetRunRate - a.NetRunRate;
  });
}

function qualifyingTeamsInPointsTable(points: Points[]): string[] {
  const qualifyingTeams = [];
  for (let i = 0; i < points.length; i++) {
    if (i < 4) {
      qualifyingTeams.push(points[i].TeamCode);
    }
    if (
      i > 3 &&
      points[i].Points === points[3].Points &&
      Math.abs(points[i].NetRunRate - points[3].NetRunRate) < 0.25
    ) {
      qualifyingTeams.push(points[i].TeamCode);
    }
  }
  return qualifyingTeams;
}

const getPossibleOutcomes = (match: Match): MatchOutcome[] => {
  return [
    {
      ...match,
      winner: match.FirstBattingTeamCode,
      loser: match.SecondBattingTeamCode,
      result: "WINNER",
      WinnerNRRChange: 0.05,
      LoserNRRChange: -0.05,
    },
    {
      ...match,
      winner: match.SecondBattingTeamCode,
      loser: match.FirstBattingTeamCode,
      result: "WINNER",
      WinnerNRRChange: 0.05,
      LoserNRRChange: -0.05,
    },
    // {
    //   ...match,
    //   winner: "",
    //   result: "DRAW",
    // },
    {
      ...match,
      winner: match.FirstBattingTeamCode,
      loser: match.SecondBattingTeamCode,
      result: "WINNER",
      WinnerNRRChange: 0.25,
      LoserNRRChange: -0.25,
    },
    {
      ...match,
      winner: match.SecondBattingTeamCode,
      loser: match.FirstBattingTeamCode,
      result: "WINNER",
      WinnerNRRChange: 0.25,
      LoserNRRChange: -0.25,
    },
  ];
};

async function combinations(
  list: MatchOutcome[][],
  n = 0,
  result: MatchOutcome[][] = [],
  current: MatchOutcome[] = [],
  indexes: number[] = []
) {
  if (n === list.length) {
    result.push(current);
  } else {
    for (let i = 0; i < list[n].length; i++) {
      const item = list[n][i];
      combinations(list, n + 1, result, [...current, item], [...indexes, i]);
    }
  }

  return result;
}
