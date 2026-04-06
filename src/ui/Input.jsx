export default function Input({
  type = "text",
  name,
  className = "",
  placeholder,
  ...props
}) {
  const classes =
   "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-text-primary-paragraph placeholder:text-text-primary-paragraph/40 backdrop-blur-sm transition focus:border-accent-dark focus:ring-2 focus:ring-accent-dark/20 outline-none";
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
