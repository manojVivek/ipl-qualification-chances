import { Team } from "@/lib/constants";
import Image from "next/image";

interface Props {
  team: Team;
}

export const TeamAvatar = ({ team }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={team.logo}
        alt={team.name}
        width={32}
        height={32}
        className="aspect-square object-contain"
      />
      {team.name}
    </div>
  );
};

export const TeamAvatarMini = ({ team }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={team.logo}
        alt={team.shortName}
        width={32}
        height={32}
        className="aspect-square object-contain"
      />
      {team.shortName}
    </div>
  );
};
