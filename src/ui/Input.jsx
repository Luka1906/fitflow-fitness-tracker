export default function Input({
  type = "text",
  name,
  className = "",
  placeholder,
  ...props
}) {
  const classes =
    "border-1 border-text-primary-paragraph px-3 py-2 placeholder:text-slate-400 rounded-md";
  return (
    <input
      type={type}
      name={name}
      className={`${className} ${classes}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
