import { Sidebar } from '@/components/dashboard/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-72">
        {children}
      </main>
    </div>
  );
}
