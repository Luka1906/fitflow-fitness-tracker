import { redirect } from "react-router-dom";

export async function signUpAction({ request }) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");

  const endpoint =
    mode === "signup"
      ? `${import.meta.env.VITE_API_URL}/auth/signup`
      : `${import.meta.env.VITE_API_URL}/auth/login`;

  try {
    let response;

    if (mode === "signup") {
      response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
    } else {
      const loginData = Object.fromEntries(formData);

      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
    }

    const responseData = await response.json();

    if (!response.ok) {
      return responseData;
    }

    return redirect(mode === "signup" ? "/onboarding" : "/profile");
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong." };
  }
}

export async function onboardingAction({ request }) {
  const formData = await request.formData();
  console.log([...formData.entries()]);
  const selectedGoals = formData.getAll("fitnessGoals");
  console.log(selectedGoals);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/onboarding`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fitnessGoals: selectedGoals }),
      credentials: "include",
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    return responseData;
  }

  return redirect("/profile");
}

export async function logoutAction() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to logout user");
  }
  return redirect("/");
}
