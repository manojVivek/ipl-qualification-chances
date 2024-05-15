import { MatchOutcome } from "@/app/api/chances/model";
import { TeamAvatarMini } from "../TeamAvatar";
import { TEAMS_MAP } from "@/lib/constants";

interface Props {
  match: MatchOutcome;
}

export const MatchCard = ({ match }: Props) => {
  return (
    <div className="flex flex-col w-80 bg-slate-100 p-3 gap-2 rounded">
      <div className="flex justify-between">
        <span className="text-xs">Match {match.RowNo}</span>
        <span className="text-xs">{match.GMTMatchDate}</span>
      </div>
      <div className="flex justify-between">
        <TeamAvatarMini team={TEAMS_MAP[match.FirstBattingTeamCode]} />
        <span>vs</span>
        <TeamAvatarMini team={TEAMS_MAP[match.SecondBattingTeamCode]} />
      </div>
      <div className="flex justify-center items-center gap-2">
        {match.winner} wins
        {match.WinnerNRRChange > 0.075 ? (
          <span className="text-xs">(with +{match.WinnerNRRChange})NRR)</span>
        ) : null}
      </div>
    </div>
  );
};
