import TrainersList from "../../components/table/TrainerList";

const ManageTrainer = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <h1 className="font-semibold text-3xl my-8">Manage All Trainers</h1>
      </div>
      <TrainersList />
    </div>
  );
};

export default ManageTrainer;
