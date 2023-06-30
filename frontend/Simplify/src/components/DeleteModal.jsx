import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { deleteTask } from "../features/Tasks/TaskSlice";

const DeleteModal = ({ open, setOpen, task }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  // get the isSuccess property from the redux store named tasks
  const { isSuccess, isError, message } = useSelector((state) => state.tasks);
  // function to delete the task
  const handleDelete = (id) => {
    // dispatch the deleteTask function with the task id an an argument
    dispatch(deleteTask(id));
    // if the dispatch is successful then let the user know
    if (isSuccess) {
      toast.info("Task has been deleted");
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="absolute top-1/4 right-1/2 w-96 translate-x-1/2 translate-y-1/2 p-8 rounded-lg shadow-lg bg-white text-black outline-none">
            <p id="transition-modal-title" variant="h6" component="h2">
              Remove <span className="font-bold uppercase">{task.title}</span>
            </p>
            <p id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure, Once deleted cannont be retrieved
            </p>
            <div className="flex items-center justify-between font-lato font-bold text-sm mt-4">
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-green-600 text-white py-2 px-2 rounded-xl hover:bg-green-500"
              >
                Yes, Delete it
              </button>
              <button
                onClick={handleClose}
                className="bg-red-600 text-white py-2 px-2 rounded-xl hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteModal;
