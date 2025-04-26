import { currentUser } from "@clerk/nextjs/server";

// Type definitions
export type SubmissionHistory = {
  id: string;
  date: string;
  result: string;
  imageUrl: string;
}[];

export type Stats = {
  totalTests: number;
  positiveRate: number;
  lastSubmission: string | null;
  streak: number;
};

export async function fetchUserData() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return {
      submissionHistory: [],
      stats: {
        totalTests: 0,
        positiveRate: 0,
        lastSubmission: null,
        streak: 0,
      },
      email,
    };
  }

  // Fetch history
  const historyRes = await fetch(
    `/api/atk-results/history?email=${encodeURIComponent(email)}`,
    { cache: "no-store" } // Ensures fresh data on each request
  );
  const submissionHistory: SubmissionHistory = historyRes.ok
    ? await historyRes.json()
    : [];

  // Fetch stats
  const statsRes = await fetch(
    `/api/atk-results/stats?email=${encodeURIComponent(email)}`,
    { cache: "no-store" }
  );
  const stats: Stats = statsRes.ok
    ? await statsRes.json()
    : {
        totalTests: 0,
        positiveRate: 0,
        lastSubmission: null,
        streak: 0,
      };

  return {
    submissionHistory,
    stats,
    email,
  };
}
