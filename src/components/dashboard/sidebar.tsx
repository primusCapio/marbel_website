'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Square,
  FileText,
  Briefcase,
  DollarSign,
  PackageCheck,
  Package,
  CalendarClock,
  Presentation,
  FileOutput,
  Gem,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPANY_NAME } from '@/lib/constants';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutGrid, exact: true },
    { href: '/dashboard/projects', label: 'Projects', icon: Briefcase },
    { href: '/dashboard/slab-planner', label: 'Slab Planner', icon: Square },
    { href: '/dashboard/boq-generator', label: 'BOQ Generator', icon: FileText },
    { href: '/dashboard/cost-analyzer', label: 'Cost Analyzer', icon: DollarSign },
    { href: '/dashboard/bulk-order', label: 'Bulk Order', icon: PackageCheck },
    { href: '/dashboard/stock-reservation', label: 'Stock Reservation', icon: Package },
    { href: '/dashboard/specs', label: 'Tech Specs', icon: FileText },
    { href: '/dashboard/delivery', label: 'Delivery Schedule', icon: CalendarClock },
    { href: '/dashboard/present', label: 'Presentation Mode', icon: Presentation },
    { href: '/dashboard/export', label: 'Export Package', icon: FileOutput },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  return (
    <aside className="w-72 bg-background border-r flex flex-col fixed h-full">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">{COMPANY_NAME}</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5',
              (link.exact ? pathname === link.href : pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard')) && 'bg-primary/10 text-primary font-medium'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className='px-4 py-4 border-t'>
          {isLoading ? (
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
          ) : user ? (
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src="" alt={user.email} />
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='text-sm font-medium'>Admin</span>
                        <span className='text-xs text-muted-foreground truncate'>{user.email}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
          ) : null}
      </div>
    </aside>
  );
}
