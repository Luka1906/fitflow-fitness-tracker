import WorkoutHeatMap from "./heatmap-chart/WorkoutHeatmap";
import WaterTrends from "./water-chart/WaterTrends";
import WeightTrends from "./weight-chart/WeightTrends";

export default function TrendCharts() {
  return (
    <>
     <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-3 justify-center">
        <WeightTrends />
        <WaterTrends />
    </div>
    <div className="border border-white/10 rounded-xl p-4">
        <WorkoutHeatMap/>
    </div>
    </>
   
  );
}
