"use client";

import {
  forwardRef,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Transaction = Readonly<{
  id: string;
  label: string;
  date: string;
  amount: number;
}>;

const TRANSACTIONS: Transaction[] = [
  { id: "t1", label: "Payment from Northwind", date: "Mar 8", amount: 420 },
  { id: "t2", label: "AWS infrastructure", date: "Mar 8", amount: -31.2 },
  { id: "t3", label: "Stripe payout", date: "Mar 7", amount: 890 },
  { id: "t4", label: "Refund — Order #3207", date: "Mar 6", amount: -64 },
  { id: "t5", label: "Client retainer", date: "Mar 5", amount: 250 },
  { id: "t6", label: "Figma subscription", date: "Mar 4", amount: -15 },
  { id: "t7", label: "Wire transfer", date: "Mar 3", amount: 1000 },
  { id: "t8", label: "Payroll", date: "Mar 2", amount: -890 },
];

const PAGE_SIZE = 5;

type RecentTransactionsTableProps = ComponentPropsWithoutRef<"div">;

// Recent transactions — Stripe-style payment list with pagination.
export const RecentTransactionsTable = forwardRef<
  HTMLDivElement,
  RecentTransactionsTableProps
>(function RecentTransactionsTable({ className, ...props }, ref) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(TRANSACTIONS.length / PAGE_SIZE);
  const slice = useMemo(
    () => TRANSACTIONS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page],
  );

  function formatAmount(n: number) {
    const abs = Math.abs(n).toFixed(2);
    return n >= 0 ? `+$${abs}` : `−$${abs}`;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-md overflow-hidden rounded-xl border border-neutral-200 bg-white",
        className,
      )}
      {...props}
    >
      <div className="border-b border-neutral-100 px-4 py-3">
        <p className="text-sm font-semibold text-neutral-900">Transactions</p>
        <p className="text-xs text-neutral-500">This month</p>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="text-xs text-neutral-500">
            <th className="px-4 py-2.5 font-medium">Description</th>
            <th className="px-3 py-2.5 font-medium">Date</th>
            <th className="px-4 py-2.5 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((tx) => (
            <tr
              key={tx.id}
              className="border-t border-neutral-100 transition-colors hover:bg-neutral-50/80"
            >
              <td className="max-w-[10rem] truncate px-4 py-3 font-medium text-neutral-900">
                {tx.label}
              </td>
              <td className="px-3 py-3 text-neutral-500">{tx.date}</td>
              <td
                className={cn(
                  "px-4 py-3 text-right tabular-nums",
                  tx.amount >= 0 ? "text-neutral-900" : "text-neutral-500",
                )}
              >
                {formatAmount(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-2.5">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="flex size-7 items-center justify-center rounded-md text-neutral-500 transition-colors enabled:hover:bg-neutral-100 disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        <span className="text-xs text-neutral-500">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
          className="flex size-7 items-center justify-center rounded-md text-neutral-500 transition-colors enabled:hover:bg-neutral-100 disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
});

RecentTransactionsTable.displayName = "RecentTransactionsTable";
