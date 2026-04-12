import Input from "../../ui/Input";
import { useActionData } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../utils/validation";

export default function LoginFields({ setIsValid }) {
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
    let inputErr = "";

    if (name === "email") {
      inputErr = validateEmail(value);
    } else if (name === "password") {
      inputErr = validatePassword(value);
    }

    setLogErr((prev) => ({
      ...prev,
      [name]: inputErr,
    }));
  };

  useEffect(() => {
    const requiredFields = ["email", "password"];
    const hasEmptyFields = requiredFields.some(
      (field) => !loginData[field].trim(),
    );
    const hasErrors = Object.values(logErr).some((err) => err !== "");

    setIsValid(!hasEmptyFields && !hasErrors);
  }, [loginData, logErr, setIsValid]);

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

      <Input
        className="md:w-[30rem] w-[20rem]"
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleOnChange}
        onBlur={handleOnBlurErr}
      />
      {logErr.password && (
        <p className="text-red-500 text-sm flex relative bottom-4">
          {logErr.password}
        </p>
      )}
    </>
  );
}
