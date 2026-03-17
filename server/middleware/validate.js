const signUpValidation = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, {
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
        console.log(errors)

        return res.status(400).json({ errors });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };
};

export default signUpValidation;