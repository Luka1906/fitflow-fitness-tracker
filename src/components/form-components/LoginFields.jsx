import Input from "../../ui/Input";
import { useActionData } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../utils/validation";

export default function LoginFields() {
  const errData = useActionData();

  const [logErr, setLogErr] = useState({});

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnBlurErr = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const emailErr = validateEmail(value);

      setLogErr((prev) => ({
        ...prev,
        [name]: emailErr,
      }));
    }
  };

  return (
    <>
      <Input
        type="email"
        className={`${logErr.email ? "border-red-400 " : ""}`}
        name="email"
        value={loginData.email}
        placeholder="Email"
        onChange={handleOnChange}
        onBlur={handleOnBlurErr}
      />
      {logErr.email && (
        <p className="text-red-500 text-sm flex relative bottom-4">
          {logErr.email}
        </p>
      )}

      <div className="flex gap-6">
        <Input
          className="md:w-[30rem] w-[20rem]"
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleOnChange}
          onBlur={handleOnBlurErr}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          className="w-4 h-4 accent-accent-dark"
        />
        <label
          htmlFor="remember"
          className="text-sm text-text-primary-paragraph cursor-pointer select-none"
        >
          Remember me
        </label>
      </div>
    </>
  );
}
