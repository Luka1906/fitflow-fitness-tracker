import { redirect } from "react-router-dom";

// SIGNUP ACTION

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

// ONBOARDING ACTION

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

// LOGOUT ACTION

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

// EDIT ACTION

export async function editInfoAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const fitnessGoals = formData.getAll("fitnessGoals");
  const finalData = { ...data, fitnessGoals};

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to edit user info");
  }

  return redirect("/profile");
}

// EDIT USER PHOTO

export async function editImageAction({ request }) {
  const formData = await request.formData();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile/avatar`,
    {
      method: "PATCH",
      body: formData,
      credentials: "include",
    },
  );

  if (!response.ok) {
    return { error: "Failed to update profile image" };
  }

  return { success: "Profile photo updated successfully" };
}
