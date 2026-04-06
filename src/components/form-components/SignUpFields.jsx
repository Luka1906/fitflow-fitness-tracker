import Input from "../../ui/Input";
import { FaCheck } from "react-icons/fa6";
import { FiEye, FiEyeOff, FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import {
  validateName,
  validateLocation,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";

export default function SignUpFields({ avatarPreview, onAvatarChange }) {
  const [signUpErr, setSignUpErr] = useState({});
  const [passVisible, setPassVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const errorText = "mt-2 text-sm text-red-400 min-h-[20px]";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col items-start w-full">
          <Input
            className={`${signUpErr.firstName ? "border-red-500" : ""}`}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
            value={signUpData.firstName}
          />
         <p className={errorText}>{signUpErr.firstName}</p>
        </div>

        <div className="flex flex-col items-start w-full">
          <Input
            className={` ${signUpErr.lastName ? "border-red-500" : ""}`}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
            value={signUpData.lastName}
          />
       <p className={errorText}>{signUpErr.lastName}</p>
        </div>
      </div>

      <div className="flex flex-col items-start w-full">
        <Input
          className={` ${signUpErr.location ? "border-red-500" : ""}`}
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleOnChange}
          onBlur={handleOnBlurErr}
          value={signUpData.location}
        />
     <p className={errorText}>{signUpErr.location}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <label
          htmlFor="avatar"
          className="group flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-accent-dark/40 bg-accent-dark/5 text-center transition hover:border-accent-dark hover:bg-accent-dark/10"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-full w-full rounded-2xl object-cover"
              alt="Preview profile image"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-text-primary-paragraph/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-dark/10 text-accent-dark">
                <FiUploadCloud className="text-xl" />
              </div>
              <div>
                <p className="font-medium text-text-primary-paragraph">
                  Upload profile image
                </p>
                <p className="text-sm text-text-primary-paragraph/50">
                  PNG or JPG, optional
                </p>
              </div>
            </div>
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
      <p className={errorText}></p>

      <div className="flex flex-col items-start w-full">
        <Input
          type="email"
          className={` ${signUpErr.email ? "border-red-500" : ""}`}
          name="email"
          value={signUpData.email}
          placeholder="Email"
          onChange={handleOnChange}
          onBlur={handleOnBlurErr}
        />
    <p className={errorText}>{signUpErr.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col items-start ">
   <div className="relative w-full">
          <Input
            className={` pr-11 ${signUpErr.password ? "border-red-500" : ""}`}
            type={passVisible.password ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleOnChange}
            onBlur={handleOnBlurErr}
          />
          <button
            type="button"
            onClick={() => handlePassVisibility("password")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-dark/80 hover:text-accent-dark transition"
          >
            {passVisible.password ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <p className={errorText}>{signUpErr.password}</p>

        </div>
     
      
        <div className="flex flex-col items-start">
          <div className="relative w-full">
            <Input
              className={`pr-11 ${
                signUpErr.confirmPassword ? "border-red-500" : ""
              }`}
              type={passVisible.confirmPassword ? "text" : "password"}
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
            ) : (
              <button
                type="button"
                onClick={() => handlePassVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-dark/80 hover:text-accent-dark transition"
              >
                {passVisible.confirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            )}
          </div>
        <p className={errorText}>{signUpErr.confirmPassword}</p>
        </div>
      </div>
    </div>
  );
}
