"use client";

import Image from "next/image";
import {
  forwardRef,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Check, Minus } from "lucide-react";

type User = Readonly<{
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}>;

const USERS: User[] = [
  {
    id: "u1",
    name: "Bidyut Kundu",
    email: "bidyut@studio.dev",
    role: "Admin",
    avatar: "/profile-picture.png",
  },
  {
    id: "u2",
    name: "Rupam Sen",
    email: "rupam@studio.dev",
    role: "Editor",
    avatar: "/woman.png",
  },
  {
    id: "u3",
    name: "Ava Chen",
    email: "ava@studio.dev",
    role: "Viewer",
    avatar: "/profile-picture.png",
  },
  {
    id: "u4",
    name: "Sofia Ortiz",
    email: "sofia@studio.dev",
    role: "Editor",
    avatar: "/woman.png",
  },
];

type UsersSelectTableProps = ComponentPropsWithoutRef<"div">;

// Bulk-select users table — header checkbox, row selection, and live count. White admin pattern.
export const UsersSelectTable = forwardRef<
  HTMLDivElement,
  UsersSelectTableProps
>(function UsersSelectTable({ className, ...props }, ref) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(["u1"]));

  const allIds = useMemo(() => USERS.map((u) => u.id), []);
  const allSelected = selected.size === USERS.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allIds));
  }

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
        <p className="text-sm font-semibold text-neutral-900">Users</p>
        <span className="text-xs text-neutral-500">
          {selected.size > 0
            ? `${selected.size} selected`
            : `${USERS.length} total`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[300px] border-collapse text-left text-sm">
          <thead>
            <tr className="text-xs text-neutral-500">
              <th className="w-10 px-4 py-2.5">
                <button
                  type="button"
                  onClick={toggleAll}
                  aria-label={allSelected ? "Deselect all" : "Select all"}
                  className={cn(
                    "flex size-4 items-center justify-center rounded border transition-colors",
                    allSelected || someSelected
                      ? "border-neutral-900 bg-neutral-900"
                      : "border-neutral-300 bg-white",
                  )}
                >
                  {allSelected ? (
                    <Check className="size-2.5 text-white" strokeWidth={3} />
                  ) : someSelected ? (
                    <Minus className="size-2.5 text-white" strokeWidth={3} />
                  ) : null}
                </button>
              </th>
              <th className="px-2 py-2.5 font-medium">Name</th>
              <th className="hidden px-3 py-2.5 font-medium md:table-cell">
                Email
              </th>
              <th className="px-4 py-2.5 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => {
              const isOn = selected.has(user.id);
              return (
                <tr
                  key={user.id}
                  onClick={() => toggleRow(user.id)}
                  className={cn(
                    "cursor-pointer border-t border-neutral-100 transition-colors",
                    isOn ? "bg-neutral-50" : "hover:bg-neutral-50/80",
                  )}
                >
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded border transition-colors",
                        isOn
                          ? "border-neutral-900 bg-neutral-900"
                          : "border-neutral-300",
                      )}
                    >
                      {isOn ? (
                        <Check
                          className="size-2.5 text-white"
                          strokeWidth={3}
                        />
                      ) : null}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="size-7 shrink-0 rounded-full object-cover"
                      />
                      <span className="font-medium text-neutral-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="hidden px-3 py-3 text-neutral-500 md:table-cell">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

UsersSelectTable.displayName = "UsersSelectTable";
