import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useTasks from "../Hooks/useTasks";
import { useNavigation } from "react-router-dom";

const TaskInput = () => {
  // const navigate=useNavigation()
  const [, refetch] = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      TaskDescription: "",
      createdAt: new Date(),
    },
  });

  return (
    <div>
      <div className="md:w-[400px] w-full mx-auto py-5">
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const response = await fetch("https://task-managementment.vercel.app/tasks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (response.ok) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Opps!! Try again",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            } catch (error) {
              console.error("An error occurred while saving the task", error);
            }
            reset();
          })}
        >
          <label className="mb-2 font-bold">Task Title</label>
          <input
            className=" block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-slate-400"
            {...register("taskTitle", { required: true })}
            defaultValue="test"
          />
          <br />
          <label className="mb-2 font-bold">Task Description</label>
          <textarea
            className=" block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-slate-400"
            {...register("TaskDescription", { required: true })}
          />
          {(errors.TaskDescription || errors.taskTitle) && (
            <p>This field is required</p>
          )}
          <input
            className="cursor-pointer block box-border md:w-[400px] w-full px-3 py-2 outline-none bg-green-400 mt-2"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default TaskInput;
