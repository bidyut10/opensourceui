"use client";

import {
  forwardRef,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type Order = Readonly<{
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "fulfilled" | "processing" | "cancelled";
}>;

const ORDERS: Order[] = [
  {
    id: "#3210",
    customer: "Northwind Studio",
    date: "Mar 8",
    amount: 248,
    status: "fulfilled",
  },
  {
    id: "#3209",
    customer: "Harbor Labs",
    date: "Mar 8",
    amount: 92,
    status: "processing",
  },
  {
    id: "#3208",
    customer: "Elm & Co.",
    date: "Mar 7",
    amount: 156,
    status: "fulfilled",
  },
  {
    id: "#3207",
    customer: "Papertrail",
    date: "Mar 6",
    amount: 64,
    status: "cancelled",
  },
  {
    id: "#3206",
    customer: "Studio Nine",
    date: "Mar 5",
    amount: 312,
    status: "fulfilled",
  },
];

type SortKey = "date" | "amount" | "status";
type SortDir = "asc" | "desc";

const STATUS_LABEL: Record<Order["status"], string> = {
  fulfilled: "Fulfilled",
  processing: "Processing",
  cancelled: "Cancelled",
};

function compareOrders(a: Order, b: Order, key: SortKey, dir: SortDir) {
  const sign = dir === "asc" ? 1 : -1;
  if (key === "amount") return (a.amount - b.amount) * sign;
  if (key === "status") return a.status.localeCompare(b.status) * sign;
  return a.date.localeCompare(b.date) * sign;
}

type OrdersTableProps = ComponentPropsWithoutRef<"div">;

// E-commerce orders table — sort by date, amount, or status. Common admin dashboard pattern.
export const OrdersTable = forwardRef<HTMLDivElement, OrdersTableProps>(
  function OrdersTable({ className, ...props }, ref) {
    const [sortKey, setSortKey] = useState<SortKey>("date");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const sorted = useMemo(
      () => [...ORDERS].sort((a, b) => compareOrders(a, b, sortKey, sortDir)),
      [sortKey, sortDir],
    );

    function toggleSort(key: SortKey) {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return;
      }
      setSortKey(key);
      setSortDir("desc");
    }

    function SortIcon({ column }: { column: SortKey }) {
      if (sortKey !== column) {
        return (
          <ArrowUpDown className="size-3 text-neutral-300" strokeWidth={2} />
        );
      }
      return sortDir === "asc" ? (
        <ArrowUp className="size-3 text-neutral-600" strokeWidth={2.5} />
      ) : (
        <ArrowDown className="size-3 text-neutral-600" strokeWidth={2.5} />
      );
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
        <div className="border-b border-neutral-100 px-4 py-3">
          <p className="text-sm font-semibold text-neutral-900">
            Recent orders
          </p>
          <p className="text-xs text-neutral-500">Last 7 days</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-xs text-neutral-500">
                <th className="px-4 py-2.5 font-medium">Order</th>
                <th className="hidden px-3 py-2.5 font-medium md:table-cell">
                  Customer
                </th>
                <th className="px-3 py-2.5 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("date")}
                    className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
                  >
                    Date
                    <SortIcon column="date" />
                  </button>
                </th>
                <th className="px-3 py-2.5 text-right font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("amount")}
                    className="ml-auto inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
                  >
                    Total
                    <SortIcon column="amount" />
                  </button>
                </th>
                <th className="px-4 py-2.5 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("status")}
                    className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
                  >
                    Status
                    <SortIcon column="status" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-neutral-100 transition-colors hover:bg-neutral-50/80"
                >
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {order.id}
                  </td>
                  <td className="hidden px-3 py-3 text-neutral-600 md:table-cell">
                    {order.customer}
                  </td>
                  <td className="px-3 py-3 text-neutral-500">{order.date}</td>
                  <td className="px-3 py-3 text-right text-neutral-900 tabular-nums">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-600">
                    {STATUS_LABEL[order.status]}
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

OrdersTable.displayName = "OrdersTable";
