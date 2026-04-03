'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MockDbUser {
  email: string;
  role: 'architect' | 'admin' | 'contractor';
  password?: string;
}

// This is a mock function to get users. In a real app, this would be a secure API call.
const getMockUsers = (): MockDbUser[] => {
  if (typeof window === 'undefined') return [];
  try {
    const usersJSON = localStorage.getItem('mock_users');
    return usersJSON ? JSON.parse(usersJSON) : [];
  } catch (e) {
    return [];
  }
};

export default function UsersPage() {
    const [users, setUsers] = useState<MockDbUser[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        setUsers(getMockUsers());
    }, []);

    const handleAction = (action: string) => {
        toast({
            title: "Coming Soon!",
            description: `${action} functionality is under development.`
        });
    }

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Users className="h-8 w-8" />
                User Management
            </h1>
            <Card>
                 <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>View and manage all registered users on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.email}>
                                    <TableCell className="font-medium">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                                    </TableCell>
                                    <TableCell>
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleAction('View Details')}>View Details</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Block User')}>Block User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
