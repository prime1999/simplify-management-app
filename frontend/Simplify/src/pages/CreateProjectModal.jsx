import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Modal, Fade, Backdrop } from "@mui/material";
import {
  createProject,
  assignTeam,
  reset,
} from "../features/Projects/ProjectSlice";

const CreateProjectModal = () => {
  // stater for the modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  // for the menuItem
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // for the form data
  const [value, setValue] = useState("pending");
  const [teamId, setTeamId] = useState(null);
  const [formData, setformData] = useState({
    title: "",
    description: "",
    status: "",
    start_date: "",
    end_date: "",
  });
  const [projectCreated, setProjectCreated] = useState(false);

  const dispatch = useDispatch();
  const { project, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.projects
  );
  const navigate = useNavigate();
  // functions for the menuItem
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { title, description, status, start_date, end_date } = formData;

  // for chooseing the task status
  const handleSelector = (value) => {
    setValue(value);
    setformData((prevState) => ({
      ...prevState,
      status: value,
    }));
    handleClose();
  };

  // function to change the value of the title, description and due_date field to what is typed in by the user
  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    // if the projectCCreated state is tru then
    if (projectCreated) {
      // show a success message toast
      toast.success("Project created, DO assign a team when ready!");
      // close the modal
      handleCloseModal();
      dispatch(reset());
    }
    // if there is an error then show a error toalst withe the error message
    if (isError) {
      toast.error(message);
    }
    //dispatch(reset());
    setProjectCreated(false);
  }, [
    projectCreated,
    isError,
    project,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  // function to submit the task
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if all fields have been filled
    if (title && description && start_date && end_date && status) {
      const projectData = {
        title,
        description,
        status,
        startDate: start_date,
        endDate: end_date,
      };

      // dispatch the createProject function in the projects slice component
      dispatch(createProject(projectData));
      // set the project created state value to true
      setProjectCreated(true);
      // clear fields
      title = "";
      description = "";
      status = "";
      start_date = "";
      end_date = "";
    } else {
      // if one or all fields was not filled then show the toast error with the message
      toast.error("Please fill in all fields");
    }
  };

  // function to assign a team to project
  const assignTeamToProject = async (projectId) => {
    if (teamId) {
      try {
        dispatch(assignTeam({ teamId, projectId }));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div
        onClick={handleOpenModal}
        className="flex items-center justify-between hover:cursor-pointer"
      >
        <AiOutlinePlus /> <p className="ml-2">Add Project</p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <div className="absolute left-[30%] top-[20%] bg-white w-[500px] shadow-md px-4 py-8 outline-none">
            <h1 className="font-poppins font-bold text-2xl uppercase">
              Create New Project
            </h1>
            <form onSubmit={handleSubmit} className="w-full mt-8 font-right">
              <input
                type="text"
                placeholder="project title"
                value={title}
                onChange={handleChange}
                id="title"
                className="w-full p-2 bg-white shadow-md focus:outline-none"
              />
              <textarea
                placeholder="project description"
                value={description}
                onChange={handleChange}
                id="description"
                className="w-full my-4 p-2 bg-white shadow-md focus:outline-none"
              />
              <div className="w-full flex items-end justify-between px-2">
                <div className="flex flex-col w-1/2">
                  <label className="text-md text-gray-600">Start-date</label>
                  <input
                    type="date"
                    value={start_date}
                    onChange={handleChange}
                    id="start_date"
                    className="w-full p-2 mt-2 bg-white shadow-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col w-1/2 mx-2">
                  <label className="text-md text-gray-600">End-date</label>
                  <input
                    type="date"
                    value={end_date}
                    onChange={handleChange}
                    id="end_date"
                    className="w-full p-2 mt-2 bg-white shadow-md focus:outline-none"
                  />
                </div>
                <div className="w-1/4">
                  {/* menu starts */}
                  <div className="flex flex-col">
                    <h3>Status</h3>
                    <div>
                      <button
                        type="button"
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className="flex items-center justify-between font-right w-full p-2 mt-2 bg-white shadow-md focus:outline-none"
                      >
                        {value}
                        {anchorEl ? (
                          <MdKeyboardArrowUp className="ml-2 hover:cursor-pointer" />
                        ) : (
                          <MdKeyboardArrowDown className="ml-2 hover:cursor-pointer" />
                        )}
                      </button>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={() => handleSelector("in-progress")}>
                          <p className="font-right">In-Progress</p>
                        </MenuItem>
                        <MenuItem onClick={() => handleSelector("completed")}>
                          <p className="font-right">Completed</p>
                        </MenuItem>
                        <MenuItem onClick={() => handleSelector("pending")}>
                          <p className="font-right">Pending</p>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  {/* menu ends */}
                </div>
              </div>
              {/* <div className="mt-8">
                <AssignTeamModal teamId={teamId} setTeamId={setTeamId} />
              </div> */}
              <button
                type="submit"
                disabled={isLoading ? true : false}
                className="w-full text-center py-2 bg-blue text-white font-right mt-4 text-lg hover:bg-secondaryBlue hover:rounded-lg hover:cursor-pointer"
              >
                Create Project
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
