"use client";

import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Customer = Readonly<{
  id: string;
  name: string;
  company: string;
  avatar: string;
  plan: "Free" | "Pro" | "Team";
  lastActive: string;
  mrr: number;
}>;

const CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Bidyut Kundu",
    company: "Studio Dev",
    avatar: "/profile-picture.png",
    plan: "Team",
    lastActive: "2h ago",
    mrr: 49,
  },
  {
    id: "c2",
    name: "Rupam Sen",
    company: "OUI Design",
    avatar: "/woman.png",
    plan: "Pro",
    lastActive: "1d ago",
    mrr: 19,
  },
  {
    id: "c3",
    name: "Ava Chen",
    company: "Northwind",
    avatar: "/profile-picture.png",
    plan: "Pro",
    lastActive: "3d ago",
    mrr: 19,
  },
  {
    id: "c4",
    name: "Sofia Ortiz",
    company: "Harbor Labs",
    avatar: "/woman.png",
    plan: "Free",
    lastActive: "1w ago",
    mrr: 0,
  },
];

type CustomersTableProps = ComponentPropsWithoutRef<"div">;

// SaaS customers table — plan, last active, and MRR. Common billing dashboard view.
export const CustomersTable = forwardRef<HTMLDivElement, CustomersTableProps>(
  function CustomersTable({ className, ...props }, ref) {
    const totalMrr = CUSTOMERS.reduce((sum, c) => sum + c.mrr, 0);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-lg overflow-hidden rounded-xl border border-neutral-200 bg-white",
          className,
        )}
        {...props}
      >
        <div className="flex items-end justify-between border-b border-neutral-100 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Customers</p>
            <p className="text-xs text-neutral-500">
              {`${CUSTOMERS.length} accounts`}
            </p>
          </div>
          <p className="text-right">
            <span className="block text-[10px] tracking-wide text-neutral-400 uppercase">
              MRR
            </span>
            <span className="text-sm font-semibold text-neutral-900 tabular-nums">
              ${totalMrr}/mo
            </span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-xs text-neutral-500">
                <th className="px-4 py-2.5 font-medium">Customer</th>
                <th className="px-3 py-2.5 font-medium">Plan</th>
                <th className="hidden px-3 py-2.5 font-medium md:table-cell">
                  Last active
                </th>
                <th className="px-4 py-2.5 text-right font-medium">MRR</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-neutral-100 transition-colors hover:bg-neutral-50/80"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={customer.avatar}
                        alt={customer.name}
                        width={28}
                        height={28}
                        className="size-7 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-neutral-900">
                          {customer.name}
                        </p>
                        <p className="truncate text-xs text-neutral-500">
                          {customer.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-neutral-600">
                    {customer.plan}
                  </td>
                  <td className="hidden px-3 py-3 text-neutral-500 md:table-cell">
                    {customer.lastActive}
                  </td>
                  <td className="px-4 py-3 text-right text-neutral-900 tabular-nums">
                    {customer.mrr > 0 ? `$${customer.mrr}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

CustomersTable.displayName = "CustomersTable";
