import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useTasks from "../Hooks/useTasks";
import { Link } from "react-router-dom";
import "./Tasks.css";
import Swal from "sweetalert2";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [cartData, refetch] = useTasks();

  useEffect(() => {
    const sortedData = cartData?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    setData(sortedData);
  }, [cartData]);

  // Edit
  const handleDelte = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-managementment.vercel.app/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              //delete success message
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Data deleted successfully",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
              // const remaining=toys.filter(toy=>toy._id!==_id)
              // setToys(remaining)
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Try again",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
                showConfirmButton: false,
                timer: 1500,
              });
              // setToys(toys)
            }
          });
      }
    });
  };

  return (
    <div>
      {/* Title section */}
      {/* <div className="flex items-center justify-between py-7">
        <p className="text-xl md:text-3xl font-bold">Task Management App</p>
        <Link to={"/create-task"} className="p-5 rounded-full bg-slate-600 plus"><FaPlus className="text-white text-xl spin"/></Link>
        
      </div> */}
      {/* data table */}
      
      {/* table */}
      <div className="w-full p-5">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left font-bold text-black text-lg md:text-xl  border-slate-600">
                Title
              </th>
              <th className="text-left font-bold text-black text-lg md:text-xl  border-slate-600">
                Description
              </th>
              <th className="text-right font-bold text-black text-lg md:text-xl  border-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((d) => (
              <tr key={d._id} className=" py-10 mb-3 bg-[#f5f5f5]">
                <td className="font-bold">{d.taskTitle}</td>
                <td className="text-xs">{d.TaskDescription}</td>
                <td className="text-right py-3 mb-2">
                  <div className="flex gap-2 items-center justify-end">
                    <Link to={`/edit-task/${d._id}`} task={d}>
                      <FaEdit className="cursor-pointer text-lg text-green-500" />{" "}
                    </Link>

                    <FaTrash
                      onClick={() => handleDelte(d._id)}
                      className="cursor-pointer text-lg text-red-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
