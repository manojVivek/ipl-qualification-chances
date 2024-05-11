import { Match, Points, TeamResult, computeCombinations } from "./model";

let competitionID: number | undefined = 148;
let upcomingSchedule: Match[] = [];
let pointsTable: Points[] = [];

let CACHE: Record<string, TeamResult> = {};

export const computeChance = (teamID: string) => {
  if (CACHE[teamID]) {
    return CACHE[teamID];
  }

  _computeChance();

  return CACHE[teamID];
};

const _computeChance = async () => {
  CACHE = await computeCombinations(pointsTable, upcomingSchedule);
};

const refreshCompetition = async () => {
  if (competitionID === undefined) {
    const competitionData = await fetch(
      "https://scores.iplt20.com/ipl/mc/competition.js"
    )
      .then((res) => res.text())
      .then((res) =>
        JSON.parse(res.replace("oncomptetion(", "").replace(");", ""))
      );
    competitionID = competitionData.competition.find(
      (c: any) => c.CompetitionName === `IPL ${new Date().getFullYear()}`
    )?.CompetitionID;
  }
};

const refreshPointsTable = async () => {
  pointsTable = await fetch(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/${competitionID}-groupstandings.js`
  )
    .then((res) => res.text())
    .then((res) =>
      JSON.parse(
        res.replace("ongroupstandings(", "").replace(");", "")
      ).points.map((team: any) => {
        return {
          TeamCode: team.TeamCode,
          Loss: parseInt(team.Loss),
          Draw: parseInt(team.Draw),
          Wins: parseInt(team.Wins),
          Points: parseInt(team.Points),
          NetRunRate: parseFloat(team.NetRunRate),
        };
      })
    );
};

const refreshSchedule = async () => {
  try {
    if (competitionID === undefined) {
      await refreshCompetition();
    }

    const schedule = await fetch(
      `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${competitionID}-matchschedule.js`
    )
      .then((res) => res.text())
      .then((res) => {
        return res;
      })
      .then(
        (res) =>
          JSON.parse(res.replace("MatchSchedule(", "").replace(");", ""))
            .Matchsummary
      );

    const upcomingScheduleNew = schedule
      .filter(
        (match: any) => match.MatchStatus === "UpComing" && match.KO === ""
      )
      .sort(
        (a: any, b: any) =>
          new Date(a.MATCH_COMMENCE_START_DATE).getTime() -
          new Date(b.MATCH_COMMENCE_START_DATE).getTime()
      );

    if (upcomingSchedule.length !== upcomingScheduleNew.length) {
      upcomingSchedule = upcomingScheduleNew.map((match: any) => {
        return {
          SecondBattingTeamCode: match.SecondBattingTeamCode,
          FirstBattingTeamCode: match.FirstBattingTeamCode,
          AwayTeamColor1: match.AwayTeamColor1,
          HomeTeamColor1: match.HomeTeamColor1,
          GroundName: match.GroundName,
          GMTMatchDate: match.GMTMatchDate,
          GMTMatchTime: match.GMTMatchTime,
          RowNo: match.RowNo,
          City: match.city,
        };
      });

      await refreshPointsTable();
      CACHE = {};
      _computeChance();
      console.log("Updating Schedule", upcomingScheduleNew.length);
    }
  } catch (e) {
    console.error("Error refreshing schedule", e);
    fetch("https://www.google.com")
      .then((res) => res.text())
      .then(console.log);
    throw e;
  }
};

setInterval(refreshSchedule, 1000 * 60 * 1);
refreshSchedule();
