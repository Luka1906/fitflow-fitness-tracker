import { redirect } from "react-router-dom";

export async function onboardingLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/onboarding`,
    {
      credentials: "include",
    },
  );

  if (response.status === 401) {
    throw redirect("/auth?mode=login");
  }

  return null;
}
