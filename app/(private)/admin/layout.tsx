import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminNavbar from './dashboard/_components/navbar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Get the current authenticated user from Clerk
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/'); // Redirect to home if not logged in
  }

  // 2. Get the user from your database to check their role
  const dbUser = await prisma.user.findUnique({
    where: { id: clerkUser.id },
    select: { role: true } // Only fetch the role field for efficiency
  });

  // 3. Check if user exists in DB and has ADMIN role
  if (!dbUser || dbUser.role !== 'ADMIN') {
    redirect('/'); // Redirect non-admin users to home
  }

  // 4. If user is admin, render the admin dashboard
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Optional: Add admin navbar/sidebar here */}
      <AdminNavbar />
      <div className="container mx-auto py-8">
        {children}
      </div>
    </div>
  );
}
