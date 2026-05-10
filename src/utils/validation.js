// SIGNUP VALIDATION

//  First Name and Last Name Validation

export const validateName = (value, fieldName = "The field") => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  if (value.trim().length < 2 || value.trim().length > 30) {
    return `${fieldName} must be between 2 and 30 characters`;
  }

  return "";
};

// Location Validation

export const validateLocation = (location) => {
  if (!location.trim()) return "";

  if (location.trim().length < 2 || location.trim().length > 100) {
    return "Location must be between 2 and 100 characters";
  }

  return "";
};

//Checkbox Validation

export const validateCheckbox = (goals) => {
  if (goals.length === 0) {
    return "You must select at least one goal";
  }

  return "";
};

// Avatar Validation

export const validateAvatar = (file) => {
  if (!file) return "";

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return "File must be a JPG, PNG, or WebP image";
  }

  const maxSizeMB = 2;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    return "File must be smaller than 2MB";
  }

  return "";
};

//  Email Validation

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Invalid email address";
  }

  return "";
};

//   Password Validation

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/;

  if (!password.trim()) {
    return "Password is required";
  }

  if (!passwordRegex.test(password)) {
    return "Use 9–20 characters with uppercase, lowercase, number, and symbol.";
  }
  return "";
};

// ConfirmPassword Validation

export const validateConfirmPassword = (password, confirmPass) => {
  if (!password) return "";
  
  if (!confirmPass.trim()) {
    return "Please confirm your password";
  }

  if (password !== confirmPass) {
    return "Passwords don't match";
  }

  return "";
};
