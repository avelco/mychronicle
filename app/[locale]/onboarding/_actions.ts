'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma'
import { Language } from '@/lib/generated/prisma/browser';

export const completeOnboarding = async (selectedGender: string, selectedTopics: string[]) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        selectedGender,
        selectedTopics,
      },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}

export async function syncUser(locale: string) {
  // 1. Get the authenticated user from Clerk
  const user = await currentUser();
  console.log(user);
  if (!user) {
    redirect('/'); // Redirect to home if not logged in
  }

  // 2. Check if user already exists in your DB
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  // 3. If user exists, return their data
  if (existingUser) {
    return existingUser;
  }

  const languagePref = locale.toUpperCase() as Language;
  
  // Optional: Validate the language is supported
  if (!Object.values(Language).includes(languagePref)) {
    throw new Error(`Unsupported language: ${locale}`);
  }

  // 4. If not, create the new user
  // Note: Adjust fields based on your actual Prisma schema
  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName!,
      lastName: user.lastName,
	    role: 'USER',
      languagePref: languagePref,
    },
  });

  return newUser;
}