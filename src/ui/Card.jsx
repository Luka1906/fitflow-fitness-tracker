export default function Card({ children, classes }) {
  return (
    <div
      className={`  flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-text-primary-paragraph/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]  ${classes}`}
    >
      {children}
    </div>
  );
}
