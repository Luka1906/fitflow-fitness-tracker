const formatWeight = (value) => {
  if (value === null || value === undefined) return "--";

  const number = Number(value);

  return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(1);
};

export default formatWeight
