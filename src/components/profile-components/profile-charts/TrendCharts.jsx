import WaterTrends from "./water-chart/WaterTrends";
import WeightTrends from "./weight-chart/WeightTrends";

export default function TrendCharts () {
    return (
        <div className="grid grid-cols-2 gap-3">
            <WeightTrends/>
            <WaterTrends/>
        </div>
    )
}