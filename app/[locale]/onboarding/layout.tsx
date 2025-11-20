import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function OnboardingLayout({ children, params }: Props) {
  const { locale } = await params;
  
  if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
    redirect(`/${locale}`)
  }

  return <>{children}</>
}