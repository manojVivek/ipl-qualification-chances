import { Points } from "@/app/api/chances/model";

interface Props {
  points: Points[];
}

export const PointsTable = ({ points }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Team</span>
        <span>Points</span>
        <span>NRR</span>
      </div>
      {points.map((point) => (
        <div key={point.TeamCode} className="flex justify-between">
          <span>{point.TeamCode}</span>
          <span>{point.Points}</span>
          <span>{point.NetRunRate}</span>
        </div>
      ))}
    </div>
  );
};
