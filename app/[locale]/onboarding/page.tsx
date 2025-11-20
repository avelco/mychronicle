import { syncUser } from "./_actions";
import OnboardingClient from "./_components/OnboardingClient";

export default async function OnboardingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dbUser = await syncUser(locale);
  return <OnboardingClient dbUser={dbUser} />;
}
