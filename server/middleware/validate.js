export const signUpValidation = (schema) => {
  return (req, res, next) => {
    const inputFields = req.body;
    try {
      const { error } = schema.validate(inputFields, {
        abortEarly: false,
      });

      if (error) {
        const errors = {};

        error.details.forEach((err) => {
          const field = err.path[0];

          if (!errors[field]) {
            errors[field] = err.message;
          }
        });
        console.log(errors);

        return res.status(400).json({ errors });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };
};

export const loginValidation = (schema) => {
  return (req, res, next) => {
    const inputFields = req.body;
    try {
      const { error, value } = schema.validate(inputFields, {
        abortEarly: false,
      });

      if (error) {
        const errors = {};

        error.details.forEach((err) => {
          const field = err.path[0];

          if (!errors[field]) {
            errors[field] = err.message;
          }
        });
        console.log(errors);

        return res.status(400).json({ errors });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
};
