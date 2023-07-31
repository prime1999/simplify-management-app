import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import { categorizeTask } from "../features/Tasks/TaskSlice";
import PendingTasks from "../components/PendingTasks";
import CompletedTask from "../components/CompletedTask";

const TasksCategories = () => {
  const dispatch = useDispatch();
  // get the current url location of the page
  const location = useLocation();
  // get the tasks for the redux strore (tasks)
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  // set a state to save each task depending on there status
  const [taskStatus, setTaskStatus] = useState({
    pending: [],
    completed: [],
    in_progress: [],
  });
  // to get the tasks based on the category
  useEffect(() => {
    dispatch(categorizeTask(path));
  }, [dispatch]);

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

  // split the url into different using the /
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  // get the tasks string from the url
  const tasksPath = pathSegments[2];
  // make the task string capitalized if there is a tasksPath
  const path = tasksPath
    ? `${tasksPath.charAt(0).toUpperCase()}${tasksPath.slice(1)}`
    : "";

  console.log(tasks);

  return (
    <div className="w-11/12 mx-auto">
      <MenuBar />
      <h1 className="text-4xl font-poppins font-bold text-black mt-4">
        {path}
      </h1>
      <div className="flex justify-between w-full mt-8">
        <PendingTasks taskStatus={taskStatus} />
        <CompletedTask taskStatus={taskStatus} />
      </div>
    </div>
  );
};

export default TasksCategories;
