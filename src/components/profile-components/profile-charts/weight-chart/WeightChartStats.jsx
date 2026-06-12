import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import formatWeight from "../../../../utils/formatWeight";

const getTotalDifferenceText = (filterCriteria) => {
  if (filterCriteria === 7) return "Change This Week";
  if (filterCriteria === 30) return "Change This Month";
  if (filterCriteria === 90) return "Change Over 3 Months";
  if (filterCriteria === "all") return "Total Change";
};

export default function WeightChartStats({
  weightLogs = [],
  weightUnit,
  filterCriteria,
}) {
  const hasData = weightLogs.length > 0;

  const weights = hasData
    ? weightLogs.map((log) => Number(log.weight))
    : [];

  const firstWeightLog = hasData ? weights[0] : null;
  const lastWeightLog = hasData ? weights.at(-1) : null;

  const weightDifference = hasData ? lastWeightLog - firstWeightLog : null;
  const lowestWeight = hasData ? Math.min(...weights) : null;
  const highestWeight = hasData ? Math.max(...weights) : null;

  return (
    <div className="grid grid-cols-3 rounded-xl bg-accent-dark/10 py-3">
      <div className="flex flex-col items-center border-r border-white/15">
        {hasData ? (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              weightDifference < 0 ? "text-emerald-300" : "text-red-400"
            }`}
          >
            {weightDifference < 0 ? <FaArrowDown /> : <FaArrowUp />}
            <p>
              {weightDifference > 0 ? "+" : ""}
              {formatWeight(weightDifference)} <span>{weightUnit}</span>
            </p>
          </div>
        ) : (
          <p className="text-sm font-semibold">No data</p>
        )}

        <p className="text-xs text-slate-400">
          {getTotalDifferenceText(filterCriteria)}
        </p>
      </div>

      <div className="flex flex-col items-center border-r border-white/15">
        <p className="text-sm font-semibold text-text-primary-paragraph">
          {hasData ? `${formatWeight(lowestWeight)} ${weightUnit}` : "No data"}
        </p>
        <p className="text-xs text-slate-400">Lowest</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm font-semibold text-text-primary-paragraph">
          {hasData ? `${formatWeight(highestWeight)} ${weightUnit}` : "No data"}
        </p>
        <p className="text-xs text-slate-400">Highest</p>
      </div>
    </div>
  );
}