import Joi from "joi";

// Signup validation

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    "string.min": "First name must be at least 2 characters long.",
    "string.max": "First name cannot exceed 30 characters.",
    "string.empty": "First name cannot be empty.",
    "any.required": "First name is required.",
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    "string.min": "Last name must be at least 2 characters long.",
    "string.max": "Last name cannot exceed 30 characters.",
    "string.empty": "Last name cannot be empty.",
    "any.required": "Last name is required.",
  }),
  location: Joi.string().min(2).max(100).optional().allow("").messages({
    "string.min": "Location must be at least 2 characters long.",
    "string.max": "Location cannot exceed 100 characters.",
  }),
  fitnessGoals: Joi.array()
    .items(Joi.string())
    .min(1)
    .max(3)
    .required()
    .messages({
      "array.min": "Please select at least 1 fitness goal.",
      "array.max": "You can select up to 3 fitness goals.",
      "any.required": "Fitness goals are required.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{9,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base":
        "Password must contain at least one number and one special character (!@#$%^&*).",
      "string.empty": "Password cannot be empty.",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Please confirm your password",
  }),
});

// Login validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/,
    )
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base":
        "Password must contain at least one number and one special character (!@#$%^&*).",
      "string.empty": "Password cannot be empty.",
    }),
});
