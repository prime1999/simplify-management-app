import { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { format } from "date-fns";
import DeleteModal from "./deleteModal";

const InProgressTask = ({ taskStatus }) => {
  // modal states
  const [open, setOpen] = useState(false);
  // function to open the modal
  const handleOpen = () => {
    setOpen(true);
    //handleDelete(id);
  };

  const { in_progress } = taskStatus;

  return (
    <>
      <div className="w-1/3 rounded-2xl" id="in_progress">
        <div className="flex items-center justify-between font-poppins font-semiBold py-4 px-8">
          <h1 className="text-blue">
            {" "}
            In-Progress{" "}
            <span className="bg-white p-2 rounded-full ml-2 inline-flex items-center justify-center h-8 w-8">
              {in_progress?.length}
            </span>
          </h1>
        </div>
        {in_progress?.map((task) => (
          <div
            key={task._id}
            className="w-11/12 mx-auto rounded-2xl bg-white font-right text-sm py-4 px-8 mb-4 text-black"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg">{task?.title}</h4>
                <p
                  style={{ backgroundColor: "rgba(162, 162, 255, 0.2)" }}
                  className="text-blue text-center rounded-2xl mt-2 px-2"
                >
                  {task?.category}
                </p>
              </div>
              <div className="flex items-center">
                <BsTrash3Fill
                  onClick={() => handleOpen()}
                  className="text-blue hover:cursor-pointer"
                />
                <Link to={`/update-task/${task._id}`}>
                  <BiEdit className="text-blue ml-4 text-xl hover:cursor-pointer" />
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
    </>
  );
};

export default InProgressTask;
