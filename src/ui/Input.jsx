export default function Input({
  type = "text",
  name,
  className = "",
  placeholder,
  ...props
}) {
  const classes =
    "border placeholder:text-slate-400 rounded-md outline-none px-3 py-2 ";
  return (
    <input
      type={type}
      name={name}
      className={` ${classes} ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
