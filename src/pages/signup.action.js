import { redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");

  const endpoint =
    mode === "signup"
      ? "http://localhost:3000/auth/signup"
      : "http://localhost:3000/auth/login";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      return responseData;
    }

    return redirect("/");
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong." };
  }
}
