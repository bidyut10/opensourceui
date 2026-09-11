import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { Clock, MapPin } from "lucide-react";

export type CinemaTicketCardProps = Readonly<
  {
    filmTitle?: string;
    cinema?: string;
    screen?: string;
    showTime?: string;
    seats?: string;
    date?: string;
    ticketId?: string;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Cinema Ticket component — styled with Tailwind CSS.
export const CinemaTicketCard = forwardRef<
  HTMLDivElement,
  CinemaTicketCardProps
>(
  (
    {
      className,
      filmTitle = "Interstellar",
      cinema = "INOX South City",
      screen = "Screen 4 · IMAX",
      showTime = "7:45 PM",
      seats = "G12, G13",
      date = "Sat, 7 Jun 2026",
      ticketId = "TKT-90421",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="cinema-ticket-card"
      className={cn("w-96 font-sans", className)}
      {...props}
    >
      <div className="flex overflow-hidden rounded-2xl bg-neutral-950">
        <div
          data-slot="cinema-ticket-card-main"
          className="min-w-0 flex-1 p-4 md:p-5"
        >
          <p className="font-mono text-[9px] tracking-[0.25em] text-amber-500/70 uppercase">
            Admit one
          </p>
          <h3 className="mt-1 truncate text-lg font-semibold tracking-tight text-white md:text-xl">
            {filmTitle}
          </h3>
          <p className="mt-0.5 truncate text-xs text-neutral-500">{cinema}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] text-neutral-600 uppercase">Screen</p>
              <p className="text-xs font-semibold text-white">{screen}</p>
            </div>
            <div>
              <p className="text-[9px] text-neutral-600 uppercase">Seats</p>
              <p className="text-xs font-semibold text-amber-400">{seats}</p>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-neutral-600" />
              <p className="text-xs text-neutral-300">{showTime}</p>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-neutral-600" />
              <p className="truncate text-xs text-neutral-300">{date}</p>
            </div>
          </div>

          <p className="mt-4 font-mono text-[8px] text-neutral-700">
            {ticketId}
          </p>
        </div>

        <div
          data-slot="cinema-ticket-card-stub"
          className="relative flex w-16 shrink-0 flex-col items-center justify-center border-l border-dashed border-neutral-700 bg-neutral-900 px-2"
        >
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white" />
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white" />
          <div
            className="rotate-180 text-[8px] font-bold tracking-widest text-neutral-600 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            {showTime}
          </div>
        </div>
      </div>
    </div>
  ),
);

CinemaTicketCard.displayName = "CinemaTicketCard";
