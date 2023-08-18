import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPending, MdIncompleteCircle } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import Spinner from "../Spinner";
import PendingProjects from "./PendingProjects";
import InProgressProject from "./InProgressProject";
import CompletedProject from "./CompletedProject";

const ProjectDesign = () => {
  // set a state to save each project depending on there status
  const [projectStatus, setProjectStatus] = useState({
    pending: [],
    completed: [],
    in_progress: [],
  });

  // initialize the useDispatch hook
  const dispatch = useDispatch();
  // get the projects state from the redux store
  const { projects, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.projects
  );

  const { pending, in_progress, completed } = projectStatus;

  useEffect(() => {
    const projectStatus = {
      pending: [],
      completed: [],
      in_progress: [],
    };

    // loop through the projects array
    projects?.forEach((project) => {
      // check each project and put them in the array based on there status
      if (project.status === "pending") {
        projectStatus.pending.push(project);
      } else if (project.status === "completed") {
        projectStatus.completed.push(project);
      } else if (project.status === "in-progress") {
        projectStatus.in_progress.push(project);
      }
    });

    // set the state of each array based on there status
    setProjectStatus({
      pending: projectStatus.pending,
      completed: projectStatus.completed,
      in_progress: projectStatus.in_progress,
    });
  }, [projects]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex items-start justify-between mt-16">
        <div className="w-[280px]">
          <div className="flex items-center justify-between font-right text-lg text-navyBlue bg-gray-200 px-4 py-2 rounded-md">
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded-full text-xl mr-2">
                <MdPending />
              </div>
              <h3>Pending</h3>
            </div>
            <p>{pending?.length}</p>
          </div>
          <div className="mt-4">
            <PendingProjects pending={pending} />
          </div>
        </div>
        <div className="w-[280px]">
          <div className="flex items-center justify-between font-right text-lg text-navyBlue bg-gray-200 px-4 py-2 rounded-md">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full text-lg mr-2">
                <GiProgression />
              </div>
              <h3>In-Progress</h3>
            </div>
            <p>{in_progress?.length}</p>
          </div>
          <div className="mt-4">
            <InProgressProject in_progress={in_progress} />
          </div>
        </div>
        <div className="w-[280px]">
          <div className="flex items-center justify-between font-right text-lg text-navyBlue bg-gray-200 px-4 py-2 rounded-md">
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded-full text-xl mr-2">
                <MdIncompleteCircle />
              </div>
              <h3>Completed</h3>
            </div>
            <p>{completed?.length}</p>
          </div>
          <div className="mt-4">
            <CompletedProject completed={completed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDesign;
