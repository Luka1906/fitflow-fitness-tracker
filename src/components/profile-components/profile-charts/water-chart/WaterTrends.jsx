import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import WaterTrendChart from "../../../../ui/charts/WaterTrendChart";

  const totalLogPerDay = (logs) => {
   const totalsByDate = {};

   logs.forEach((log) => {
    if(!totalsByDate[log.logged_at]) {
        totalsByDate[log.logged_at] = 0
    }
   totalsByDate[log.logged_at]+= log.amount;
   })

    return(Object.entries(totalsByDate)).map(([logged_at, amount]) => ({logged_at, amount}))
    }


export default function WaterTrends () {
    const {water} = useLoaderData();
    const totalWaterLogPerDay = totalLogPerDay(water.logs)

    // [{amount:500, logged_at: "2026-05-30T05:00:00.000Z"}, {amount:100, logged_at: "2026-05-30T05:00:00.000Z"}]

  
      const [filterCriteria, setFilterCriteria] = useState(7);
 return (
     <div className="border border-white/10 p-3 rounded-2xl bg-slate-800/20 shadow-2xl">
       <article>
         <header className="flex px-2  justify-between">
           <div className="flex flex-col">
             <h2 className="text-white font-semibold">Water Intake Trend</h2>
             <p className="text-sm text-slate-500">
               {Number(filterCriteria)
                 ? `Last ${filterCriteria} days`
                 : "All days"}
             </p>
           </div>
           <div className="relative flex  border border-white/10 rounded-xl w-40 pl-3 text-slate-400  ">
             <select
               onChange={(event) => {
                 const value = event.target.value;
                 setFilterCriteria(value === "all" ? "all" : Number(value));
               }}
               className="appearance-none outline-none w-full"
               name="days"
               aria-label="Choose weight trend"
             >
               <option value="7">
                 7 Days
               </option>
               <option value="30">30 Days</option>
 
               <option value="90">3 Months</option>
               <option value="all">All</option>
             </select>
             <FiChevronDown className=" absolute right-3 pointer-events-none h-full" />
           </div>
         </header>
         <div className="flex flex-col space-y-5">
           <div className="h-[360px] w-full mt-4 flex flex-col">
             <WaterTrendChart
               waterLogs = {totalWaterLogPerDay}
               filterCriteria={filterCriteria}
               waterGoal={water.goal}
             />
           </div>

           {/* Water Chart Stats */}

           <div>
           
           </div>
         </div>
       </article>
     </div>
   );
}