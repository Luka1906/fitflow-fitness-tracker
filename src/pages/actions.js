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

    if (!response.ok && responseData.errors) {
      return responseData.errors;
    }
    if (!response.ok && responseData.error) {
      return { email: responseData.error };
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
  const finalData = { ...data, fitnessGoals };

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

// EDIT USER PHOTO ACTION

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

//ADD WEIGHT ACTION

export async function addWeightAction({ request }) {
  const formData = await request.formData();
  const data = {
    weight: formData.get("weight"),
    unit: formData.get("unit"),
    date: formData.get("date"),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile/add-weight`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );

  if (!response.ok) {
    return {
      success: false,
      error: response.message || "Cannot log users weight. Please try again!",
    };
  }

  return { success: true };
}

// ADD WATER ACTION

export async function addWaterAction({ request }) {
  const formData = await request.formData();

  const data = {
    amount: formData.get("amount"),
    date: formData.get("date"),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile/add-water`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: responseData.message || "Failed to log water. Please try again",
    };
  }

  return { success: true };
}

// ADD WORKOUT ACTION

export async function addWorkoutAction({ request }) {
  const formData = await request.formData();

  let workouts = [];

  try {
    workouts = JSON.parse(formData.get("workoutData"));
  } catch {
    return {
      success: false,
      error: "Invalid workout data",
    };
  }

  const data = {
    workouts: workouts,
    notes: formData.get("note"),
    date: formData.get("date"),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/profile/add-workout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: responseData.message || "Failed to log workout. Please try again",
    };
  }
  return { success: true };
}
