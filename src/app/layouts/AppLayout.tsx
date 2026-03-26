import type { PropsWithChildren } from 'react';

import { Navbar } from '@/shared/components/navigation/Navbar';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
