import Input from "../../ui/Input";
import FitnessGoal from "./FitnessGoal";
import { FaCheck } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useActionData } from "react-router-dom";

import { useState } from "react";
import {
  validateName,
  validateLocation,
  validateCheckbox,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";

export default function SignUpFields({
  fitnessGoals,
  avatarPreview,
  onAvatarChange,
}) {
  //   const errData = useActionData();

  const [signUpErr, setSignUpErr] = useState({});
  const [passVisible, setPassVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    selectedGoals: [],
    email: "",
    password: "",
    confirmPassword: "",
  });

  //   Handler Functions

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSignUpErr((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleOnGoalChange = (event) => {
    const { value, checked } = event.target;

    setSignUpData((prev) => {
      if (checked) {
        if (prev.selectedGoals.length >= 3) {
          return prev;
        }
        return {
          ...prev,
          selectedGoals: [...prev.selectedGoals, value],
        };
      }
      return {
        ...prev,
        selectedGoals: prev.selectedGoals.filter((goal) => goal !== value),
      };
    });
  };

  const handleOnBlurErr = (event) => {
    const { name, value } = event.target;
    let inputErr;

    switch (name) {
      case "firstName":
        inputErr = validateName(value, "First Name");

        break;
      case "lastName":
        inputErr = validateName(value, "Last Name");

        break;
      case "location":
        inputErr = validateLocation(value);

        break;
      case "fitnessGoals":
        inputErr = validateCheckbox(signUpData.selectedGoals);

        break;
      case "email":
        inputErr = validateEmail(value);

        break;
      case "password":
        inputErr = validatePassword(value);

        break;
      case "confirmPassword":
        inputErr = validateConfirmPassword(signUpData.password, value);

        break;

      default:
        break;
    }

    setSignUpErr((prev) => ({
      ...prev,
      [name]: inputErr,
    }));
  };

  const handlePassVisibility = (fieldName) => {
    setPassVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <>
      <div
        className={`flex gap-6 ${signUpErr.firstName || signUpErr.lastName ? "mb-10" : ""}`}
      >
        <div className="relative flex-1">
          <Input
            className={` w-full  ${signUpErr.firstName ? "border-red-500" : ""}`}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
            value={signUpData.firstName}
          />

          {signUpErr.firstName && (
            <p className="absolute   mt-2 text-sm text-red-500">
              {signUpErr.firstName}
            </p>
          )}
        </div>

        <div className="relative flex-1">
          <Input
            className={` w-full  ${signUpErr.lastName ? "border-red-500 " : ""}`}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
            value={signUpData.lastName}
          />

          {signUpErr.lastName && (
            <p className="absolute  mt-2 text-sm text-red-500">
              {signUpErr.lastName}
            </p>
          )}
        </div>
      </div>
      <Input
        className={` w-full  ${signUpErr.location ? "border-red-500 " : ""}`}
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleOnChange}
        onBlur={handleOnBlurErr}
        value={signUpData.location}
      />
      {signUpErr.location && (
        <p className="text-red-500 text-sm flex  relative bottom-4">
          {signUpErr.location}
        </p>
      )}

      <fieldset
        className={`flex flex-col items-start gap-1 border-1 rounded-md p-3 ${signUpErr.fitnessGoals && "border-red-500"}`}
      >
        <legend
          className={`text-accent-dark font-bold ${signUpErr.fitnessGoals && "text-red-500"} `}
        >
          Select your fitness goals (You can choose up to three)
        </legend>
        {fitnessGoals.map((goal) => (
          <FitnessGoal
            key={goal.value}
            goal={goal}
            checked={signUpData.selectedGoals.includes(goal.value)}
            disabled={
              signUpData.selectedGoals.length >= 3 &&
              !signUpData.selectedGoals.includes(goal.value)
            }
            onChange={handleOnGoalChange}
            onBlur={handleOnBlurErr}
            error={signUpErr.fitnessGoals}
          />
        ))}
      </fieldset>
      {signUpErr.fitnessGoals && (
        <p className="text-red-500 text-sm flex  relative bottom-4">
          {signUpErr.fitnessGoals}
        </p>
      )}

      <div className="border-1 border-text-primary-paragraph px-3 py-4  placeholder:text-slate-400 rounded-md ">
        <label
          htmlFor="avatar"
          className="cursor-pointer  flex items-center justify-center w-full h-40 border-2 border-dashed border-accent-dark rounded-md text-sm text-slate-500 hover:bg-bg-dark hover:text-text-primary-paragraph transition duration-200"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="object-contain h-full w-full rounded-md "
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
          onChange={onAvatarChange}
        />
      </div>

      <Input
        type="email"
        className={`${signUpErr.email ? "border-red-500  " : ""}`}
        name="email"
        value={signUpData.email}
        placeholder="Email"
        onChange={handleOnChange}
        onBlur={handleOnBlurErr}
      />
      {signUpErr.email && (
        <p className="text-red-500 text-sm flex  relative bottom-4">
          {signUpErr.email}
        </p>
      )}

      <div
        className={`flex gap-6 ${
          signUpErr.password?.length > 0 || signUpErr.confirmPassword
            ? "mb-18"
            : ""
        }`}
      >
        <div className="relative flex-1">
          <Input
            className={`w-full pr-10 ${
              signUpErr.password?.length > 0 ? "border-red-500 " : ""
            }`}
            type={`${passVisible.password ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
          />
          {passVisible.password ? (
            <FiEyeOff
              className="text-accent-dark absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => handlePassVisibility("password")}
            />
          ) : (
            <FiEye
              className="text-accent-dark absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => handlePassVisibility("password")}
            />
          )}

          {signUpErr.password && (
            <p className="absolute mt-2 text-sm text-red-500 text-left">
              {signUpErr.password}
            </p>
          )}
        </div>

        <div className="relative flex-1">
          <Input
            className={`w-full pr-10  ${
              signUpErr.confirmPassword ? "border-red-500 " : ""
            }`}
            type={`${passVisible.confirmPassword ? "text" : "password"}`}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signUpData.confirmPassword}
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
          />
         
       {signUpData.password &&
signUpData.confirmPassword &&
signUpData.password === signUpData.confirmPassword &&
!signUpErr.confirmPassword ? (
  <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
) : passVisible.confirmPassword ? (
  <FiEyeOff
    className="text-accent-dark absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
    onClick={() => handlePassVisibility("confirmPassword")}
  />
) : (
  <FiEye
    className="text-accent-dark absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
    onClick={() => handlePassVisibility("confirmPassword")}
  />
)}

          {signUpErr.confirmPassword && (
            <p className="absolute mt-2 text-sm text-red-500 text-left">
              {signUpErr.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
