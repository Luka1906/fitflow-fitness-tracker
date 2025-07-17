export default function Button({variant = "primary", children, ...props}) {
  const baseStyles = "px-6 py-2 rounded-md font-semibold cursor-pointer ";

  const variants = {
    primary: "bg-accent-dark text-white hover:bg-accent-dark/90",
    outline: "border-2 border-cta-dark text-cta-dark hover:bg-cta-dark/10",
  }

  const className = `${baseStyles} ${variants[variant] || variants.primary}`;
  
    return (
        <button className={className} {...props}>{children}</button>
    )
}

// <button className="px-6 py-2 bg-accent-dark text-white rounded-md font-semibold hover:bg-accent-dark/90 transition">
//             Sign Up
//           </button>
//           <button className="px-6 py-2 border-2 border-cta-dark rounded-md text-cta-dark font-semibold hover:bg-cta-dark/10 transition">
//             Log Ine
//           </button>
