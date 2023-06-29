import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import PendingTasks from "./PendingTasks";
import CompletedTask from "./CompletedTask";
import InProgressTask from "./InProgressTask";

const TaskDesign = () => {
  // set a state to save each task depending on there status
  const [taskStatus, setTaskStatus] = useState({
    pending: [],
    completed: [],
    in_progress: [],
  });

  // get the tasks for the redux strore (tasks)
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    // check and set the state of the status depending of the status using switch
    // tasks?.filter((task) => {
    //   switch (task.status) {
    //     case "completed":
    //       setCompleted((prevCompleted) => [...prevCompleted, task]);
    //       break;
    //     case "in-progress":
    //       setInProgress((prevInProgress) => [...prevInProgress, task]);
    //       break;
    //     case "pending":
    //       setPending((prevPending) => [...prevPending, task]);
    //       break;
    //     default:
    //       return false;
    //   }

    //   if (task.status === "completed") {
    //     setCompleted([...completed, task]);
    //   }
    //   return true;
    // });
    // array of objects to store the tasks based on there status
    const taskStatus = {
      pending: [],
      completed: [],
      in_progress: [],
    };

    // loop through the tasks array
    tasks?.forEach((task) => {
      // check each task and put them in the array based on there status
      if (task.status === "pending") {
        taskStatus.pending.push(task);
      } else if (task.status === "completed") {
        taskStatus.completed.push(task);
      } else if (task.status === "in-progress") {
        taskStatus.in_progress.push(task);
      }
    });

    // set the state of each array based on there status
    setTaskStatus({
      pending: taskStatus.pending,
      completed: taskStatus.completed,
      in_progress: taskStatus.in_progress,
    });
  }, [tasks]);

  return (
    <>
      <div className="flex justify-between w-full mt-16">
        <PendingTasks taskStatus={taskStatus} />
        <CompletedTask taskStatus={taskStatus} />
        <InProgressTask taskStatus={taskStatus} />
      </div>
    </>
  );
};

export default TaskDesign;
