import Card from "../../ui/Card";

export default function Testimonial({ avatar, name, role, text }) {
  return (
    <div className="w-full max-w-xl animate-fadeIn">
      <Card
        sizeClass="w-full"
        className="rounded-2xl shadow-2xl bg-slate-700/50 backdrop-blur-md p-6 border border-white/10"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Avatar */}
          <img
            src={avatar}
            alt={role}
            className="w-20 h-20 rounded-full object-cover  object-top border-2 border-accent-dark shadow-md"
          />

          {/* Quote */}
          <div className="flex flex-col gap-2">
            <p className="text-4xl text-accent-dark leading-none">❝</p>
            <p className="text-text-primary-light text-lg leading-relaxed font-medium tracking-wide">
              {text}
            </p>
          </div>

          {/* Name + Role */}
          <div className="text-center mt-4">
            <p className="text-white font-semibold">{name}</p>
            <p className="text-accent-dark text-sm">{role}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
