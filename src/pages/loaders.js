// loaders.js
import { redirect } from "react-router-dom";

async function getCurrentUser() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile`,
    {
      credentials: "include",
    },
  );

  if (response.status === 401) {
    throw redirect("/auth?mode=login");
  }

  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message || "Failed to load user");
  }
  console.log(data)

  return data;
}

// PROFILE LOADER
export async function profileLoader() {
  const user = await getCurrentUser();

  if (!user.onboarding_completed) {
    throw redirect("/onboarding");
  }

  return user;
}

// ONBOARDING LOADER
export async function onboardingLoader() {
  const user = await getCurrentUser();
 

  if (user.onboarding_completed) {
    throw redirect("/profile");
  }

  return user;
}

// AUTH LOADER

export async function authLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile`,
    {
      credentials: "include",
    },
  );

  if (response.ok) {
    return redirect("/profile");
  }

  return null;
}
