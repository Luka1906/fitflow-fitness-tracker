import { Link, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

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
          <form className="flex flex-col gap-6">
            {isSignup && (
              <div className="flex gap-6">
                <Input
                  className="w-1/2"
                  type="text"
                  name="name"
                  placeholder="First Name"
                />
                <Input
                  className="w-1/2"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
            )}
            {isSignup && (
              <Input type="text" name="location" placeholder="Location" />
            )}

            {isSignup && (
              <fieldset className="flex flex-col items-start gap-1 border-1 rounded-md p-3   ">
                <legend className="text-accent-dark font-bold ">
                  Select your fitness goals (You can choose up to two):
                </legend>
                {fitnessGoals.map((goal) => (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 bg-bg-dark border-1  border-accent-dark rounded-sm 
               checked:bg-accent-dark checked:border-transparent 
               focus:outline-none transition duration-200"
                      key={goal.value}
                      name="fitnessGoals"
                      value={goal.value}
                    />
                    {goal.label}
                  </label>
                ))}
              </fieldset>
            )}
            {isSignup && (
              <div className="border-1 border-text-primary-paragraph px-3 py-4  placeholder:text-slate-400 rounded-md ">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer flex items-center justify-center w-full h-40 border-2 border-dashed border-accent-dark rounded-md text-sm text-slate-500 hover:bg-bg-dark hover:text-text-primary-paragraph transition duration-200"
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      className="object-contain h-full w-full rounded-md"
                      alt="Preview profile image"
                    />
                  ) : (
                    "     Click to upload profile image"
                  )}
                </label>
                <Input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            )}

            <Input type="email" name="email" placeholder="Email" />

            <div className="flex gap-6">
              <Input
                className={`${isSignup ? "w-1/2" : "md:w-[30rem] w-[20rem]"}`}
                type="password"
                name="password"
                placeholder="Password"
              />

              {isSignup && (
                <Input
                  className="w-1/2"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              )}
            </div>
            <Button className="w-full uppercase" variant="primary">
              {isSignup ? "Register" : "Login"}
            </Button>
          </form>
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
