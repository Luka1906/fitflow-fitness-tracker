import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { getFilteredData } from "../../../utils/getFilteredData";
import TrendCharts from "./TrendCharts";
import { useLoaderData } from "react-router-dom";
import WeightTrendChart from "../../../ui/charts/WeightTrendChart";

export default function WeightTrends() {
  const { weight} = useLoaderData();
  const [filterCriteria, setFilterCriteria] = useState(30);
  return (
    <div className="border border-white/10 p-3 rounded-2xl bg-slate-800/10">
      <article>
        <header className="flex px-2  justify-between">
          <div className="flex flex-col">
            <h2 className="text-white font-semibold">Weight Trend</h2>
            <p className="text-sm text-slate-500">{Number(filterCriteria) ? `Last ${filterCriteria} days` : "All days"}</p>
          </div>
          <div className="relative flex  border border-white/10 rounded-xl w-40 pl-3 text-slate-400  ">
            <select
              onChange={(event) => {
                const value = event.target.value;
                setFilterCriteria(value === "all" ? "all" : Number(value));
              }}
              className="appearance-none outline-none"
              name="days"
              aria-label="Choose weight trend"
            >
              <option de value="30">
                30 Days
              </option>
              <option value="7">7 Days</option>

              <option value="90">3 Months</option>
              <option value="all">All</option>
            </select>
            <FiChevronDown className=" absolute right-3 pointer-events-none h-full" />
          </div>
        </header>
        <WeightTrendChart
          weightLogs={getFilteredData(weight.logs, filterCriteria)} filterCriteria={filterCriteria}
        />
      </article>
    </div>
  );
}
