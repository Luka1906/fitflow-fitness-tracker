import Card from "../ui/Card";

export default function Testimonial({ avatar, role, text, }) {
  return (
   <div className="animate-fadeIn">
  <Card sizeClass="w-150">
        <div className="flex gap-4">
          <p className="text-6xl  text-accent-dark ">❝</p>
          <p className="text-lg text-text-primary-dark/90  ">{text}</p>
        </div>

        <div>
          <img
            src={avatar}
            alt={role}
            className="w-25 h-25 object-cover object-top rounded-full mx-auto mb-1"
          />
          <p className="text-base text-accent-dark">{role}</p>
        </div>
      </Card>
   </div>
    

  );
}
