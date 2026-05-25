export default function Button({
  as: Component = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyles = "px-6 py-3 rounded-2xl font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-accent-dark text-white hover:bg-accent-dark/90 transition",

    outline:
      "border border-accent-dark text-accent-dark hover:bg-accent-dark/10 transition",
    ghost: "text-accent-dark hover:bg-accent-dark/10",
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
