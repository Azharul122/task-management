import Tasks from "./Tasks/Tasks";
import TaskInput from "./Tasks/TaskInput";
import useTasks from "./Hooks/useTasks";

const TaskHome = () => {
  const [cartData] = useTasks();
  console.log(cartData);
  return (
    <div className="w-full">
      <div className="w-[96%] md:w-[90%] mx-auto">
        <TaskInput></TaskInput>
        <Tasks></Tasks>
      </div>
    </div>
  );
};

export default TaskHome;
