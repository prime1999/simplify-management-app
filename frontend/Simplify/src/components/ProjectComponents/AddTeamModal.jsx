import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Fade, Backdrop } from "@mui/material";
import { AiOutlineTeam } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import SearchMemberDisplay from "./Multipurpose/SearchMemberDIsplay";
import { searchUser } from "../../features/Auth/AuthSlice";
import SelectedUsers from "./Multipurpose/SelectedUsers";
import { createTeam } from "../../features/Teams/TeamSlice";

const AddTeamModal = ({ children }) => {
  const dispatch = useDispatch();
  const { users, userList, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );
  // stater for the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // state for the search
  const [user, setUser] = useState("");
  // state for form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSearch = async (query) => {
    setUser(query);
    if (!query) {
      return;
    }
    dispatch(searchUser(query));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const teamData = {
      ...formData,
      members: JSON.stringify(userList),
    };
    dispatch(createTeam(teamData));
    console.log(teamData);
  };

  return (
    <>
      {children ? (
        <button onClick={handleOpen} className="w-full">
          {children}
        </button>
      ) : (
        <></>
      )}
      <div>
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
            <div className="w-[500px] absolute top-[10%] left-[35%] bg-white shadow-md p-4">
              <h1 className="text-xl font-poppins font-bold my-4">
                Create a team for a project
              </h1>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Team name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-400 rounded-md px-2 pl-8 focus:outline-none"
                  />
                  <AiOutlineTeam className="absolute left-2 top-3 text-gray-400 text-lg" />
                </div>
                <div className="relative my-4">
                  <input
                    type="text"
                    placeholder="Team description"
                    id="description"
                    value={description}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-400 rounded-md px-2 pl-8 focus:outline-none"
                  />
                  <MdDescription className="absolute left-2 top-3 text-gray-400 text-lg" />
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search user by name/email"
                      value={user}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full h-10 border border-gray-400 rounded-md px-2 pl-8 focus:outline-none"
                    />
                    <RxMagnifyingGlass className="absolute left-2 top-3 text-gray-400 text-lg" />
                  </div>
                  <div>
                    <SelectedUsers />
                  </div>
                  {users && <SearchMemberDisplay users={users} />}
                </div>
                <button className="w-full text-center font-poppins text-white bg-blue h-10 rounded-lg hover:bg-secondaryBlue">
                  Create Team
                </button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default AddTeamModal;
