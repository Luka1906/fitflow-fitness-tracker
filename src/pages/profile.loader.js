import { redirect } from "react-router-dom";
export async function profileLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile`,
    {
      credentials: "include",
    },
  );
  if (response.status === 401) {
    throw redirect("/auth?mode=login");
  }
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to load profile");
  }

  return responseData;
}

