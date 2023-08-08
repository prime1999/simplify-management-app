import { useState, useEffect } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { Modal, Backdrop, Fade } from "@mui/material";
import { format, formatDistance, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { createNotes, getNotes } from "../features/Notes/NotesSlice";
import { getTimeDiff } from "../config/NotesLogic";
import { toast } from "react-toastify";

const TaskDetailsModal = ({ task, open, handleClose }) => {
  // state to handle the time left to finish task
  const [dateLeft, setDateLeft] = useState("");
  const [formatedDate, setFormatedDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [percent, setPercent] = useState(null);
  // state for the note
  const [note, setNote] = useState("");
  // initialize the dispatch function
  const dispatch = useDispatch();
  // get the note stat from the notes redux store
  const { notes, isLoading, message, isSuccess, isError } = useSelector(
    (state) => state.notes
  );
  useEffect(() => {
    // get the due date of the task in a formatted way to present in the UI
    let date = parseISO(task?.due_date);
    let newDate = format(date, "EE MM dd yyyy");
    setDueDate(newDate);
    // store today's date in the formated date variable
    let formatedDate = format(new Date(), "yyyy-MM-dd");
    const today = parseISO(formatedDate);
    setFormatedDate(format(today, "EE MM dd yyyy"));

    // let dateLeft = differenceInDays(date, today);
    // console.log(dateLeft);
    // get the time left to finish the project by calc the distancebetween toady and the date variable above
    const difference = formatDistance(today, date);
    setDateLeft(difference);
  }, []);

  useEffect(() => {
    // dispatch the getNotes function and pass the task id has an argument
    dispatch(getNotes(task._id));
  }, [dispatch, note]);

  // function to add a note
  const AddNote = (e) => {
    // prevent the default submition function
    e.preventDefault();
    // make a try catch block
    try {
      // dispatch the create notes function to create a note with the task id and note as an argument
      dispatch(createNotes({ taskId: task._id, note }));
      // clear the note input field
      setNote("");
    } catch (error) {
      // if thre is an error then show a toast with the error message
      if (isError) {
        toast.error(message);
      }
    }
  };

  return (
    <div>
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
            <div className="absolute top-[2%] left-[33%] w-[500px] bg-white rounded-lg shadow-lg py-4">
              <div className="font-poppins py-4 px-8">
                <h1 className="font-bold text-3xl">{task.title}</h1>
                <div className="my-2">
                  <h3 className="text-lg font-bold mb-2">Task Description</h3>
                  <p className="">{task.description}</p>
                </div>
                <div className="w-8/12 my-8">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-darkGray">category:</h6>
                    <p className="font-semibold">{task.category}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-darkGray">status:</h6>
                    <p
                      id={
                        task.status === ("pending" || "completed")
                          ? `${task.status}`
                          : "in_progress"
                      }
                      className="px-2 rounded-lg text-blue font-semibold"
                    >
                      {task.status}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-darkGray">due_date:</h6>
                    <p className="text-black font-semibold">{task.due_date}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-darkGray">Reminder:</h6>
                    <p className="text-black font-semibold">{dateLeft} left</p>
                  </div>
                </div>
              </div>
              <hr className="border" />
              <div className="py-4 px-8 font-poppins">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-semibold">Notes</h1>
                  <p className="text-gray-400">{notes ? notes.length : ""}</p>
                </div>
                <form
                  onSubmit={AddNote}
                  className="flex justify-between items-center mt-2"
                >
                  <input
                    type="text"
                    placeholder="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-11/12 rounded-lg border py-1 px-2 focus:outline-none"
                  />
                  <button className="bg-blue p-2 text-white rounded-lg">
                    <BsFillSendCheckFill />
                  </button>
                </form>
                {notes && (
                  <div className="h-[150px] p-2 mt-4 overflow-auto">
                    {notes?.map((note) => (
                      <div
                        key={note._id}
                        className="my-2 p-2 font-lato text-md bg-gray-100"
                      >
                        <p className="font-bold">{note.text}</p>
                        <p className="text-sm text-gray-400">
                          {getTimeDiff(note.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
