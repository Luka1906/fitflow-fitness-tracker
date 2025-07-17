import Card from "../ui/Card";

export default function Testimonial({ avatar, role, text }) {
  return (
    <Card>
      <div className="flex flex-col gap-4 items-center text-center">
        <p className="text-7xl leading-none">❝</p>
        <p className="text-lg text-white/90">{text}</p>
        <div>
          <img src={avatar} alt={role} className="w-16 h-16 object-cover object-top rounded-full mx-auto mb-1" />
          <p className="text-sm text-white/60">{role}</p>
        </div>
      </div>
    </Card>
  );
}
