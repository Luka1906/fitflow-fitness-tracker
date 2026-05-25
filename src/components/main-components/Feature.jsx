import Button from "../../ui/Button";
import Card from "../../ui/Card";

export default function Feature({ icon: Icon, title, description }) {
  return (
    <Card classes="items-start text-left">
      <div className="rounded-2xl border border-white/10 bg-white-4 p-3">
        <Icon className="text-3xl text-accent-dark" />
      </div>

      <h2 className="text-xl font-semibold text-text-primary-headings">
        {title}
      </h2>

      <p className="leading-relaxed text-text-primary-paragraph">
        {description}
      </p>
    </Card>
  );
}