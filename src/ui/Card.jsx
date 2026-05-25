export default function Card({ children, classes }) {
  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${classes}`}
    >
      {children}
    </div>
  );
}