import Button from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { useState } from "react";
import { AddWeightForm } from "./AddWeightForm";
import { AddWaterForm } from "./AddWaterForm";
import AddWorkoutForm from "./AddWorkoutForm";
import { useLoaderData } from "react-router-dom";

export default function EmptyData() {
  const [activeModal, setActiveModal] = useState(false);
  const data = useLoaderData();
  console.log(data);



  return (
    <>
      <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-white/5 border border-white/10">
        { !data.waterLogs ? (
          <h2 className="text-2xl font-semibold">
            Start your fitness journey 💪{" "}
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold">
            Welcome back, {data.first_name} 👋{" "}
          </h2>
        )}
        {!data.weightLogs || !data.waterLogs ? (
          <div className="space-y-1 text-slate-400">
            <p>You haven't added data yet.</p>
            <p>Let's set things up so we can track your progress</p>
          </div>
        ) : (
          <div className="space-y-1 text-slate-400">
            <p>Nice work staying consistent! </p>
            <p>Log your data and keep building your progress.</p>
          </div>
        )}
       
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {!data.weightLogs && (
            <Button onClick={() => setActiveModal("addWeight")}>
              Add your weight
            </Button>
          )}
          {!data.waterLogs && (
            <Button
              onClick={() => setActiveModal("logWater")}
              variant="outline"
            >
              Log water
            </Button>
          )}
          <Button
            onClick={() => setActiveModal("addWorkout")}
            variant="outline"
          >
            Add workout
          </Button>
        </div>
      </div>
      {activeModal === "addWeight" && (
        <Modal open={activeModal} onClose={() => setActiveModal(null)}>
          <AddWeightForm onClose={() => setActiveModal(null)} />
        </Modal>
      )}
      {activeModal === "logWater" && (
        <Modal open={activeModal} onClose={() => setActiveModal(null)}>
          <AddWaterForm onClose={() => setActiveModal(null)} />
        </Modal>
      )}
      {activeModal === "addWorkout" && (
        <Modal open={activeModal} onClose={() => setActiveModal(null)}>
          <AddWorkoutForm onClose={() => setActiveModal(null)} />
        </Modal>
      )}
    </>
  );
}
