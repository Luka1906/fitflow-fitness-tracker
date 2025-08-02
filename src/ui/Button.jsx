export default function Button({
  as: Component = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyles = "px-6 py-2 rounded-md font-semibold cursor-pointer ";

  const variants = {
    primary:
      "bg-accent-dark/90 text-text-primary-headings hover:bg-accent-dark",
    outline: "border-2 border-cta-dark text-cta-dark hover:bg-cta-dark/10",
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

