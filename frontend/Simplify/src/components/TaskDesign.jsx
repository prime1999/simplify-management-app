import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
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
