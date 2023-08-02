import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import { categorizeTask } from "../features/Tasks/TaskSlice";
import PendingTasks from "../components/PendingTasks";
import CompletedTask from "../components/CompletedTask";
import InProgressTask from "../components/InProgressTask";

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
  // path state
  const [path, setPath] = useState("");

  useEffect(() => {
    // split the url into different using the /
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    // get the tasks string from the url
    const tasksPath = pathSegments[2];
    // make the task string capitalized if there is a tasksPath

    const formatedPath = tasksPath
      ? `${tasksPath.charAt(0).toUpperCase()}${tasksPath.slice(1)}`
      : "";
    setPath(formatedPath);
  });

  // to get the tasks based on the category
  useEffect(() => {
    dispatch(categorizeTask(path));
  }, [dispatch, path]);

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
    <div className="w-11/12 mx-auto">
      <MenuBar />
      {tasks?.length !== 0 ? (
        <>
          <h1 className="text-4xl font-poppins font-bold text-black mt-4">
            {path}
          </h1>
          <div className="flex justify-between w-full mt-8">
            <PendingTasks taskStatus={taskStatus} />
            <InProgressTask taskStatus={taskStatus} />
            <CompletedTask taskStatus={taskStatus} />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center my-4">
            <div className="flex flex-col items-center font-poppins">
              <h1 className="text-3xl my-4">No Task To Show</h1>
              <Link
                to="/add-task"
                className="bg-blue mt-4 px-4 py-2 text-white text-lg font-right duration-500 ease-in-out hover:bg-secondaryBlue hover:rounded-lg"
              >
                Add Task
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksCategories;
