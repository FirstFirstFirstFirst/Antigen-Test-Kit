import { fetchUserData } from "@/components/dashboard-server";
import DashboardClient from "@/components/dashboard-client";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // Fetch data from server
  const { submissionHistory, stats, email } = await fetchUserData();

  // Pass data to client component
  return (
    <DashboardClient
      initialSubmissionHistory={submissionHistory}
      initialStats={stats}
      userEmail={email}
    />
  );
}
