import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function Feature({ icon, title, description }) {
  const Icon = icon;

  return (
    <Card>
              <Icon className="text-4xl text-accent-dark drop-shadow-md" />
      <h2 className="text-2xl font-semibold ">{title}</h2>


      <p className="text-gray-300">{description}</p>

      <Button variant="outline">Learn More</Button>
    </Card>
  );
}
