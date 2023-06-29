import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../features/Tasks/TaskSlice";
import MenuBar from "../components/MenuBar";
import TaskDesign from "../components/TaskDesign";

const Tasks = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <>
      <div className="w-11/12 mx-auto">
        <MenuBar />
        <TaskDesign />
      </div>
    </>
  );
};

export default Tasks;
