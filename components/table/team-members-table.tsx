"use client";

import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { MoreHorizontal } from "lucide-react";

type Member = Readonly<{
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: "active" | "invited";
}>;

const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Bidyut Kundu",
    email: "bidyut@studio.dev",
    role: "Lead Engineer",
    avatar: "/profile-picture.png",
    status: "active",
  },
  {
    id: "m2",
    name: "Rupam Sen",
    email: "rupam@studio.dev",
    role: "Design Lead",
    avatar: "/woman.png",
    status: "active",
  },
  {
    id: "m3",
    name: "Ava Chen",
    email: "ava@studio.dev",
    role: "Product",
    avatar: "/profile-picture.png",
    status: "active",
  },
  {
    id: "m4",
    name: "Sofia Ortiz",
    email: "sofia@studio.dev",
    role: "Research",
    avatar: "/woman.png",
    status: "invited",
  },
];

type TeamMembersTableProps = ComponentPropsWithoutRef<"div">;

// Team members table — avatar, name, email, role, and status. Uses /profile-picture.png and /woman.png.
export const TeamMembersTable = forwardRef<
  HTMLDivElement,
  TeamMembersTableProps
>(function TeamMembersTable({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-lg overflow-hidden rounded-xl border border-neutral-200 bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Team members</p>
          <p className="text-xs text-neutral-500">
            {`${MEMBERS.length} people`}
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          Invite
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-sm">
          <thead>
            <tr className="text-xs text-neutral-500">
              <th className="px-4 py-2.5 font-medium">Member</th>
              <th className="hidden px-3 py-2.5 font-medium md:table-cell">
                Role
              </th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="w-10 px-2 py-2.5" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((member) => (
              <tr
                key={member.id}
                className="border-t border-neutral-100 transition-colors hover:bg-neutral-50/80"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={32}
                      height={32}
                      className="size-8 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-neutral-900">
                        {member.name}
                      </p>
                      <p className="truncate text-xs text-neutral-500">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-3 py-3 text-neutral-600 md:table-cell">
                  {member.role}
                </td>
                <td className="px-3 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        member.status === "active"
                          ? "bg-emerald-500"
                          : "bg-neutral-300",
                      )}
                    />
                    {member.status === "active" ? "Active" : "Invited"}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <button
                    type="button"
                    aria-label={`Actions for ${member.name}`}
                    className="flex size-7 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                  >
                    <MoreHorizontal className="size-4" strokeWidth={1.75} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

TeamMembersTable.displayName = "TeamMembersTable";
