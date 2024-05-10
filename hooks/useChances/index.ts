import { Team } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import type { TeamResult } from "@/app/api/chances/model";

export const useChances = (team: Team | undefined) => {
  return useQuery({
    queryKey: ["chances", team?.name],
    queryFn: async () => {
      const response: any = await fetch(
        `/api/chances?team=${encodeURIComponent(team?.shortName ?? "")}`
      ).then((res) => res.json());

      console.log("response", response);

      return response as TeamResult;
    },
    enabled: team != null,
  });
};
