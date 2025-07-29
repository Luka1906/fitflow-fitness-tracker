import Button from "../../ui/Button";
import Card from "../../ui/Card";

export default function SignUpForm() {
  const fitnessGoals = [
    { value: "lose-weight", label: "Lose Weight" },
    { value: "build-muscle", label: "Build Muscle" },
    { value: "improve-endurance", label: "Improve Endurance" },
    { value: "increase-flexibility", label: "Increase Flexibility" },
    { value: "boost-strength", label: "Boost Strength" },
    { value: "overall-health", label: "Improve Overall Health" },
    { value: "balance-mobility", label: "Improve Balance & Mobility" },
    { value: "rehabilition-recovery", label: "Rehabilitation & Recovery" },
    { value: "competition", label: "Prepare for a Competition" },
  ];

  return (
    <section aria-labelledby="signup-heading " className="px-6 pt-10 pb-20">
      <header className="text-center">
        <h1 id="signup-heading" className="text-3xl text-accent-dark mb-4 tracking-wide font-bold">
          Let's Go!
        </h1>
      </header>
      <Card classes="w-[40rem] mx-auto p-10 my-10">
        <p className=" font-bold">
          {" "}
          Create your free account and start tracking your progress
        </p>
        <form className="flex flex-col  justify-center gap-6 ">
          <div className="flex gap-6">
            <input
              className="border-1 border-text-primary-paragraph px-3 py-2 w-1/2 placeholder:text-slate-400 rounded-md"
              type="text"
              name="name"
              placeholder="First Name"
            />
            <input
              className="border-1 border-text-primary-paragraph px-3 py-2 w-1/2 placeholder:text-slate-400 rounded-md"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <input
            className="border-1 border-text-primary-paragraph px-3 py-2  placeholder:text-slate-400 rounded-md"
            type="text"
            name="location"
            placeholder="Location"
          />
          <fieldset className="flex flex-col items-start gap-1 border-1 rounded-md p-3   ">
            <legend className="text-accent-dark font-bold ">
              Select your fitness goals (You can choose up to two):
            </legend>
            {fitnessGoals.map((goal) => (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="appearance-none w-4 h-4 bg-bg-dark border-1  border-accent-dark rounded-sm 
               checked:bg-accent-dark checked:border-transparent 
               focus:outline-none transition duration-200"
                  name="fitnessGoals"
                  value={goal.value}
                />
                {goal.label}
              </label>
            ))}
          </fieldset>
          <div className="border-1 border-text-primary-paragraph px-3 py-4  placeholder:text-slate-400 rounded-md ">
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="border-accent-dark p-10 border-dotted border-2"
            />
          </div>

          <input
            className="border-1 border-text-primary-paragraph px-3 py-2  placeholder:text-slate-400 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
          />
          <div className="flex gap-6">
            <input
              className="border-1 border-text-primary-paragraph px-3 py-2 w-1/2 placeholder:text-slate-400 rounded-md"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input
              className="border-1 border-text-primary-paragraph px-3 py-2 w-1/2 placeholder:text-slate-400 rounded-md"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <Button className="w-full uppercase" variant="primary">
            Register
          </Button>
        </form>
      </Card>
    </section>
  );
}
