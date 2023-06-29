import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, reset } from "../features/Tasks/TaskSlice";
import MenuBar from "../components/MenuBar";
import TaskDesign from "../components/TaskDesign";
import Spinner from "../components/Spinner";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, message, isSuccess, isLoading } = useSelector(
    (state) => state.tasks
  );
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="w-11/12 mx-auto">
        <MenuBar />
        {!tasks ? (
          <div className="flex items-center justify-center h-72">
            <div className="flex flex-col items-center mt-16 h-48">
              <h1 className="font-poppins font-bold text-3xl">
                NO TASK TO SHOW
              </h1>
              <Link
                to="/add-task"
                className="bg-blue mt-4 px-4 py-2 text-white text-lg font-right duration-500 ease-in-out hover:bg-secondaryBlue hover:rounded-lg"
              >
                Add Task
              </Link>
            </div>
          </div>
        ) : (
          <TaskDesign />
        )}
      </div>
    </>
  );
};

export default Tasks;
