"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type PresenceDockPerson = Readonly<{
  id: string;
  name: string;
  initials?: string;
  tone?: "rose" | "sky" | "amber" | "emerald" | "neutral";
  online?: boolean;
}>;

export type PresenceDockProps = Readonly<
  {
    people?: readonly PresenceDockPerson[];
    maxVisible?: number;
    defaultOpen?: boolean;
    label?: string;
    onSelect?: (id: string) => void;
  } & ComponentPropsWithoutRef<"div">
>;

const DEFAULT_PEOPLE: readonly PresenceDockPerson[] = [
  { id: "ava", name: "Ava Patel", initials: "AP", tone: "rose", online: true },
  { id: "noah", name: "Noah Kim", initials: "NK", tone: "sky", online: true },
  {
    id: "mia",
    name: "Mia Johnson",
    initials: "MJ",
    tone: "amber",
    online: false,
  },
  {
    id: "leo",
    name: "Leo Chen",
    initials: "LC",
    tone: "emerald",
    online: true,
  },
];

function avatarTone(tone: PresenceDockPerson["tone"]) {
  switch (tone) {
    case "rose":
      return "bg-rose-400 text-white";
    case "sky":
      return "bg-sky-400 text-white";
    case "amber":
      return "bg-amber-400 text-neutral-900";
    case "emerald":
      return "bg-emerald-400 text-neutral-900";
    default:
      return "bg-neutral-800 text-white";
  }
}

function getInitials(person: PresenceDockPerson) {
  if (person.initials) return person.initials;
  return person.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

// Presence dock — collaborator stack in MacDock frosted shell.
export const PresenceDock = forwardRef<HTMLDivElement, PresenceDockProps>(
  (
    {
      className,
      people = DEFAULT_PEOPLE,
      maxVisible = 3,
      defaultOpen = false,
      label,
      onSelect,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const visible = people.slice(0, maxVisible);
    const overflow = Math.max(0, people.length - maxVisible);
    const onlineCount = people.filter((person) => person.online).length;

    return (
      <div
        ref={ref}
        data-slot="presence-dock"
        className={cn("relative inline-flex font-sans", className)}
        {...props}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-label={label ?? `${onlineCount} people online`}
          onClick={() => setOpen((value) => !value)}
          className="ease-smooth relative flex h-[3.75rem] items-center rounded-full border border-neutral-50 bg-white/50 px-2.5 py-2 shadow-xl shadow-black/10 backdrop-blur-md transition-transform duration-300 will-change-transform hover:scale-[1.02]"
        >
          <span className="flex items-center">
            {visible.map((person, index) => (
              <span
                key={person.id}
                className={cn(
                  "relative flex size-11 items-center justify-center rounded-full border-2 border-white text-[11px] font-semibold shadow-xs",
                  avatarTone(person.tone),
                  index > 0 && "-ml-2.5",
                  index === 0 && "z-30",
                  index === 1 && "z-20",
                  index === 2 && "z-10",
                )}
              >
                {getInitials(person)}
                {person.online ? (
                  <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-emerald-400" />
                ) : null}
              </span>
            ))}
            {overflow > 0 ? (
              <span className="-ml-2.5 flex size-11 items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-[11px] font-semibold text-white">
                +{overflow}
              </span>
            ) : null}
          </span>
          <span className="ml-2.5 text-xs font-medium text-neutral-600">
            {onlineCount} live
          </span>
        </button>

        <ul
          className={cn(
            "ease-smooth absolute top-[calc(100%+0.5rem)] left-0 z-20 w-full origin-top overflow-hidden rounded-2xl border border-neutral-50 bg-white/90 p-2 shadow-xl shadow-black/10 backdrop-blur-md transition-[opacity,transform] duration-200",
            open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0",
          )}
        >
          {people.map((person) => (
            <li key={person.id}>
              <button
                type="button"
                onClick={() => onSelect?.(person.id)}
                className="ease-smooth flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors duration-150 hover:bg-neutral-50"
              >
                <span
                  className={cn(
                    "relative flex size-11 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    avatarTone(person.tone),
                  )}
                >
                  {getInitials(person)}
                  <span
                    className={cn(
                      "absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white",
                      person.online ? "bg-emerald-400" : "bg-neutral-300",
                    )}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-neutral-900">
                    {person.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {person.online ? "Active now" : "Away"}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

PresenceDock.displayName = "PresenceDock";
