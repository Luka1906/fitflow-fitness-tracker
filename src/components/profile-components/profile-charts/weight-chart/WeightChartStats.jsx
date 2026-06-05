import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import formatWeight from "../../../../utils/formatWeight";

const getTotalDifferenceText = (filterCriteria) => {
  if (filterCriteria === 7) return "Change This Week";
  if (filterCriteria === 30) return "Change This Month";
  if (filterCriteria === 90) return "Change Over 3 Months";
  if (filterCriteria === "all") return "Total Change";
};

export default function WeightChartStats({ weightLogs, weightUnit, filterCriteria }) {
  console.log(weightLogs);
  const firstWeightLog = weightLogs?.[0]?.weight;
  const lastWeightLog = weightLogs?.at(-1)?.weight;

  // Weight Change
  const weightDifference = Number(lastWeightLog) - Number(firstWeightLog);
  

  // Lowest Weight

  const lowestWeight = Math.min(...weightLogs.map((log) => Number(log.weight)))

  // Highest Weight
  const highestWeight = Math.max(...weightLogs.map((log) => Number(log.weight)))

  return (
    <div className="grid grid-cols-3 bg-accent-dark/10 py-3 rounded-xl">

        {/* Total Change */}
      <div className="flex flex-col items-center  border-r border-white/15 ">
      <div className="flex flex-col items-center">
 <div
          className={`flex ${weightDifference < 0 ? "text-emerald-300" : "text-red-400"} items-center gap-1 font-semibold text-sm`}
        >
          {weightDifference < 0 ? <FaArrowDown /> : <FaArrowUp />}
          <p>
              {weightDifference > 0 ? "+" : ""}
            {formatWeight(weightDifference)}{" "}
            <span className="font-semibold">
              {weightUnit}
            </span>
          </p>
        </div>
        <p className="text-xs text-slate-400">{getTotalDifferenceText(filterCriteria)}</p>
      </div>
      </div>

      {/* Lowest Weight */}
      <div className="flex flex-col items-center border-r border-white/15">
        <p className="text-sm font-semibold text-text-primary-paragraph"> {lowestWeight} <span>{weightUnit}</span></p>
        <p className="text-xs text-slate-400">Lowest</p>
      </div>

         {/* Highest Weight */}
      <div className="flex flex-col items-center border-white/15">
        <p className="text-sm font-semibold text-text-primary-paragraph"> {highestWeight} <span>{weightUnit}</span></p>
        <p className="text-xs text-slate-400">Highest</p>
      </div>



      <div>

      </div>
       
    </div>
  );
}

