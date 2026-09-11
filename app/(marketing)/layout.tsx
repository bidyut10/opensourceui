import type { ReactNode } from "react";

/**
 * Shared landmark for marketing routes so skip-to-content works site-wide.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main id="main-content" className="flex min-h-full flex-1 flex-col">
      {children}
    </main>
  );
}
