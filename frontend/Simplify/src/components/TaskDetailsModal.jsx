import { useState, useEffect } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { Modal, Backdrop, Fade } from "@mui/material";
import { format, formatDistance, parseISO } from "date-fns";

const TaskDetailsModal = ({ children, task }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dateLeft, setDateLeft] = useState("");
  const [formatedDate, setFormatedDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [percent, setPercent] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    let date = parseISO(task?.due_date);
    let newDate = format(date, "EE MM dd yyyy");
    setDueDate(newDate);

    let formatedDate = format(new Date(), "yyyy-MM-dd");
    const today = parseISO(formatedDate);
    setFormatedDate(format(today, "EE MM dd yyyy"));

    // let dateLeft = differenceInDays(date, today);
    // console.log(dateLeft);
    const difference = formatDistance(today, date);
    setDateLeft(difference);
  }, []);

  return (
    <div>
      {children ? (
        <>
          <div>
            <button onClick={handleOpen}>{children}</button>

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
                <div className="absolute top-[10%] left-[33%] w-[500px] bg-white rounded-lg shadow-lg py-4">
                  <div className="font-poppins py-4 px-8">
                    <h1 className="font-bold text-3xl">{task.title}</h1>
                    <div className="my-4">
                      <h3 className="text-lg font-bold mb-2">
                        Task Description
                      </h3>
                      <p className="">{task.description}</p>
                    </div>
                    <div className="w-1/2 my-8">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="text-darkGray">category:</h6>
                        <p className="font-semibold">{task.category}</p>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="text-darkGray">status:</h6>
                        <p
                          id={
                            task.status === (completed || pending)
                              ? `${task.status}`
                              : "in_progress"
                          }
                          className="px-2 rounded-lg text-blue font-semibold"
                        >
                          {task.status}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="text-darkGray">due_date:</h6>
                        <p className="text-black font-semibold">
                          {task.due_date}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="text-darkGray">Reminder:</h6>
                        <p className="text-black font-semibold">
                          {dateLeft} left
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="border" />
                  <div className="py-4 px-8 font-poppins">
                    <h1 className="text-lg font-semibold">Notes</h1>
                    <form className="flex justify-between items-center mt-4">
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
                    {/* notes go here */}
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskDetailsModal;
