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

  const weights = hasData ? weightLogs.map((log) => Number(log.weight)) : [];

  const firstWeightLog = hasData ? weights[0] : null;
  const lastWeightLog = hasData ? weights.at(-1) : null;

  const weightDifference = hasData ? lastWeightLog - firstWeightLog : null;
  const lowestWeight = hasData ? Math.min(...weights) : null;
  const highestWeight = hasData ? Math.max(...weights) : null;

  return (
    <div className="grid min-w-0 grid-cols-3 rounded-xl bg-accent-dark/10 px-2 sm:px-0 py-3">
      <div className="flex min-w-0 flex-col items-center border-r border-white/15 px-1 text-center">
        {hasData ? (
          <div
            className={`flex min-w-0 items-center gap-1 text-xs font-semibold sm:text-sm ${
              weightDifference < 0 ? "text-emerald-300" : weightDifference === 0 ? "text-text-primary-paragraph" : "text-red-400"
            }`}
          >
            {weightDifference < 0 ? (
              <FaArrowDown className="shrink-0 text-[11px] sm:text-xs" />
            ) : weightDifference > 0 ? (
              <FaArrowUp className="shrink-0 text-[11px] sm:text-xs" />
            ) : ""}

            <p className="min-w-0 truncate">
              {weightDifference > 0 ? "+" : ""}
              {formatWeight(weightDifference)}{" "}
              <span className="text-[11px] sm:text-xs">{weightUnit}</span>
            </p>
          </div>
        ) : (
          <p className="truncate text-xs font-semibold sm:text-sm">No data</p>
        )}

        <p className="mt-1 max-w-full text-center text-[0.65rem] leading-tight text-slate-400 sm:text-xs">
          {getTotalDifferenceText(filterCriteria)}
        </p>
      </div>

      <div className="flex min-w-0 flex-col items-center border-r border-white/15 px-1 text-center">
        <p className="max-w-full truncate text-xs font-semibold text-text-primary-paragraph sm:text-sm">
          {hasData ? `${formatWeight(lowestWeight)} ${weightUnit}` : "No data"}
        </p>
        <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">Lowest</p>
      </div>

      <div className="flex min-w-0 flex-col items-center px-1 text-center">
        <p className="max-w-full truncate text-xs font-semibold text-text-primary-paragraph sm:text-sm">
          {hasData ? `${formatWeight(highestWeight)} ${weightUnit}` : "No data"}
        </p>
        <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">Highest</p>
      </div>
    </div>
  );
}