export default function Button({
  as: Component = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyles = "px-6 py-2 rounded-md font-semibold cursor-pointer focus ";

  const variants = {
  primary:
    "bg-accent-dark text-white hover:bg-accent-dark/90 transition",

  outline:
    "border border-accent-dark text-accent-dark hover:bg-accent-dark/10 transition",
};

  const classes = `${baseStyles} ${
    variants[variant] || variants.primary
  } ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

