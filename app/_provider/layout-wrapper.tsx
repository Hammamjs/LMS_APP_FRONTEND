'use client';

import { usePathname } from 'next/navigation';

import { Navbar } from '@/shared/components/navbar';
import { Footer } from '@/shared/components/footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isWatchPage = pathname.includes('/watch');

  if (isWatchPage) {
    return <main className="h-screen overflow-hidden">{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
