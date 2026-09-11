import Link from "next/link";

import {
  StatusPageShell,
  statusLinkClassName,
  statusMutedLinkClassName,
} from "@/app/_shared/status-page-shell";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-full flex-1 flex-col">
      <StatusPageShell
        mark="404"
        title="Page not found"
        description="That link doesn’t go anywhere. Browse components, or go home."
        actions={
          <>
            <Link href="/components" className={statusLinkClassName}>
              Browse components
            </Link>
            <Link href="/" className={statusMutedLinkClassName}>
              Home
            </Link>
          </>
        }
      />
    </main>
  );
}
