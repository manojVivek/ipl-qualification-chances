import { Fragment } from "react";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { TEAMS, Team } from "@/lib/constants";
import { TeamAvatar } from "../TeamAvatar";

interface Props {
  selectedTeam: Team | undefined;
  setSelectedTeam: (team: Team) => void;
}

export default function TeamSelector({ selectedTeam, setSelectedTeam }: Props) {
  return (
    <Listbox value={selectedTeam} onChange={setSelectedTeam}>
      {({ open }: { open: boolean }) => (
        <>
          <Listbox.Label className="block text-md font-medium leading-6 text-white"></Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-80">
              <span className="block truncate">
                {selectedTeam?.name != null ? (
                  <TeamAvatar team={selectedTeam} />
                ) : (
                  "Select a team"
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <Icon icon="heroicons:chevron-down" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {TEAMS.map((team) => (
                  <Listbox.Option
                    key={team.name}
                    className={({ active }: { active: boolean }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={team}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          <TeamAvatar team={team} />
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <Icon icon="heroicons:check" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
