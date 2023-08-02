import { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { format } from "date-fns";
import DeleteModal from "./deleteModal";

const PendingTasks = ({ taskStatus }) => {
  const { pending } = taskStatus;
  // modal states
  const [open, setOpen] = useState(false);
  // function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {pending?.length !== 0 ? (
        <div className="w-1/3 rounded-2xl" id="pending">
          <div className="flex items-center justify-between font-poppins font-semiBold py-4 px-8">
            <h1 className="text-green-500">
              {" "}
              Pending{" "}
              <span className="bg-white p-2 rounded-full ml-2 inline-flex items-center justify-center h-8 w-8">
                {pending?.length}
              </span>
            </h1>
          </div>
          {pending?.map((task) => (
            <div
              key={task._id}
              className="w-11/12 mx-auto rounded-2xl bg-white font-right text-sm py-4 px-8 mb-4 text-black"
            >
              <div className="flex justify-between items-start text-center">
                <div>
                  <h4 className="text-lg">{task?.title}</h4>
                  <p
                    style={{ backgroundColor: "rgba(112, 234, 99, 0.2)" }}
                    className="text-green-500 w-14 rounded-2xl mt-2 px-2"
                  >
                    {task?.category}
                  </p>
                </div>
                <div className="flex items-center">
                  <BsTrash3Fill
                    onClick={handleOpen}
                    className="text-green-500 hover:cursor-pointer"
                  />
                  <Link to={`/update-task/${task._id}`}>
                    <BiEdit className="text-green-500 ml-4 text-xl hover:cursor-pointer" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between mt-8">
                <p className="text-gray-400 text-md">
                  {format(new Date(task?.due_date), "MMMM d, yyyy")}
                </p>
                <Link className="text-lg">view</Link>
              </div>
              <div>
                <DeleteModal open={open} setOpen={setOpen} task={task} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-xl font-bold uppercase">No Pending Task</h1>
      )}
    </>
  );
};

export default PendingTasks;
