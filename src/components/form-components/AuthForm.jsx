import { Form, Link, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import SignUpFields from "./SignUpFields";
import LoginFields from "./LoginFields";
import { useEffect, useState } from "react";
import { useActionData, useNavigation } from "react-router-dom";

export default function AuthForm() {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [serverErr, setServerErr] = useState({});
  const [isValid, setIsValid] = useState(false);

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
    setServerErr(errors || {});
  }, [errors]);

  const handleClearServerErr = () => {
    setServerErr({});
  };

  return (
    <section
      aria-labelledby="signup-heading"
      className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10"
    >
      <header className="text-center">
        <h1
          id="signup-heading"
          className="mb-4 text-3xl font-bold tracking-wide text-accent-dark"
        >
          Let&apos;s Go!
        </h1>
      </header>

      <Card classes="mx-auto my-8 w-full max-w-xl p-5 sm:my-10 sm:p-8 md:max-w-2xl md:p-10">
        <p className="pb-2 text-sm font-bold sm:text-base">
          {isSignup
            ? "Create your free account and start tracking your progress"
            : "Log in to access your dashboard and track your progress."}
        </p>

        <div className="flex flex-col gap-3">
          <Form
            method="POST"
            encType="multipart/form-data"
            className="flex flex-col gap-5 sm:gap-6"
          >
            {isSignup ? (
              <SignUpFields
                key="signup"
                avatarPreview={avatarPreview}
                onAvatarChange={handleAvatarChange}
                clearServerErr={handleClearServerErr}
                setIsValid={setIsValid}
              />
            ) : (
              <LoginFields key="login" setIsValid={setIsValid} />
            )}

            <Button
              disabled={isSubmitting || !isValid}
              type="submit"
              className={`w-full uppercase ${
                !isValid ? "cursor-not-allowed" : ""
              }`}
              variant="primary"
            >
              {isSubmitting
                ? "Submitting..."
                : isSignup
                  ? "Register"
                  : "Login"}
            </Button>

            <ol>
              {serverErr &&
                Object.values(serverErr).map((err) => (
                  <li key={err} className="relative text-red-400">
                    {err}
                  </li>
                ))}
            </ol>
          </Form>

          <div className="mt-4 text-left text-[13px] text-slate-500 sm:text-sm">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account yet?"}{" "}
            <Link
              to={`/auth/?mode=${isSignup ? "login" : "signup"}`}
              className="font-medium text-accent-dark hover:underline"
            >
              {isSignup ? "Log in" : "Sign up here"}
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}