import Button from "../../ui/Button";
import Card from "../../ui/Card";

export default function Feature({ icon, title, description }) {
  const Icon = icon;

  return (
    <Card classes="w-80">
              <Icon className="text-4xl text-accent-dark drop-shadow-md" />
      <h2 className="text-2xl font-semibold  text-text-primary-headings">{title}</h2>


      <p>{description}</p>

      <Button variant="outline">Learn More</Button>
    </Card>
  );
}
