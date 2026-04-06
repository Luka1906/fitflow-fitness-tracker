export default function Card({ children, classes }) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center text-center gap-4 p-6 rounded-2xl 
      bg-white/[0.04] border border-white/10 backdrop-blur-2xl 
      shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${classes}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accent-dark/10 pointer-events-none" />


        {children}
  
    </div>
  );
}