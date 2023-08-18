import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamMenu from "../../components/ProjectComponents/TeamMenu";
import ProjectDesign from "../../components/ProjectComponents/ProjectDesign";
import { getProjects } from "../../features/Projects/ProjectSlice";

const Projects = () => {
  // initialize the useDispatch hook
  const dispatch = useDispatch();
  // get the projects state from the redux store
  const { projects, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div className="container w-11/12 mx-auto">
      <TeamMenu />
      {projects ? (
        <ProjectDesign />
      ) : (
        <div className="flex items-center justify-center h-72">
          <div className="flex flex-col items-center mt-16 h-48">
            <h1 className="font-poppins font-bold text-3xl">
              NO PROJECT TO SHOW
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
