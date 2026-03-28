export default function FitnessGoal({
  goal,
  onChange,
  onBlur,
  checked,
  defaultChecked,
  disabled,
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        className="appearance-none w-5 h-5 rounded-md border border-gray-400 
  checked:bg-accent-dark checked:border-accent-dark 
  disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        name="fitnessGoals"
        value={goal.value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />

      <span>{goal.label}</span>
    </label>
  );
}
