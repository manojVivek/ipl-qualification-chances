export interface Team {
  name: string;
  shortName: string;
  logo: string;
}

export const TEAMS_MAP: Record<string, Team> = {
  MI: {
    name: "Mumbai Indians",
    shortName: "MI",
    logo: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
  },
  CSK: {
    name: "Chennai Super Kings",
    shortName: "CSK",
    logo: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
  },
  DC: {
    name: "Delhi Capitals",
    shortName: "DC",
    logo: "https://scores.iplt20.com/ipl/teamlogos/DC.png",
  },
  RR: {
    name: "Rajasthan Royals",
    shortName: "RR",
    logo: "https://scores.iplt20.com/ipl/teamlogos/RR.png",
  },
  LSG: {
    name: "Lucknow Super Giants",
    shortName: "LSG",
    logo: "https://scores.iplt20.com/ipl/teamlogos/LSG.png",
  },
  GT: {
    name: "Gujarat Titans",
    shortName: "GT",
    logo: "https://scores.iplt20.com/ipl/teamlogos/GT.png",
  },
  SRH: {
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    logo: "https://scores.iplt20.com/ipl/teamlogos/SRH.png",
  },
  RCB: {
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    logo: "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
  },
  PBKS: {
    name: "Punjab Kings",
    shortName: "PBKS",
    logo: "https://scores.iplt20.com/ipl/teamlogos/PBKS.png",
  },
  KKR: {
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    logo: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
  },
};

export const TEAMS = Object.values(TEAMS_MAP).sort((a, b) =>
  a.name.localeCompare(b.name)
);
