import { Form, Link, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import SignUpFields from "./SignUpFields";
import LoginFields from "./LoginFields";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isSignup]);

  const fitnessGoals = [
    { value: "lose-weight", label: "Lose Weight" },
    { value: "build-muscle", label: "Build Muscle" },
    { value: "improve-endurance", label: "Improve Endurance" },
    { value: "increase-flexibility", label: "Increase Flexibility" },
    { value: "boost-strength", label: "Boost Strength" },
    { value: "overall-health", label: "Improve Overall Health" },
    { value: "balance-mobility", label: "Improve Balance & Mobility" },
    { value: "rehabilition-recovery", label: "Rehabilitation & Recovery" },
    { value: "competition", label: "Prepare for a Competition" },
  ];

  return (
    <section aria-labelledby="signup-heading " className="px-6 pt-10 pb-20">
      <header className="text-center">
        <h1
          id="signup-heading"
          className="text-3xl text-accent-dark mb-4 tracking-wide font-bold"
        >
          Let's Go!
        </h1>
      </header>
      <Card classes="md:w-[40rem] mx-auto p-10 my-10">
        <p className="font-bold">
          {isSignup
            ? "Create your free account and start tracking your progress"
            : "   Log in to access your dashboard and track your progress."}
        </p>

        <div className="flex flex-col gap-3">
          <Form
            method="POST"
            encType="multipart/form-data"
            className="flex flex-col gap-6"
          >
            {isSignup ? (
              <SignUpFields
                key="signup"
                fitnessGoals={fitnessGoals}
                avatarPreview={avatarPreview}
                onAvatarChange={handleAvatarChange}
              />
            ) : (
              <LoginFields key="login" />
            )}

            <Button className="w-full uppercase" variant="primary">
              {isSignup ? "Register" : "Login"}
            </Button>
          </Form>
          <div className="text-left text-sm text-slate-500 mt-4">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account yet?"}{" "}
            <Link
              to={`/auth/?mode=${isSignup ? "login" : "signup"}`}
              className="text-accent-dark hover:underline font-medium"
            >
              {isSignup ? "Log in" : "Sign up here"}
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
