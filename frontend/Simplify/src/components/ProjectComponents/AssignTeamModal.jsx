import { useState, useEffect } from "react";
import { Modal, Fade, Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GrStatusGood } from "react-icons/gr";
import { getTeams } from "../../features/Teams/TeamSlice";
import AddTeamModal from "./AddTeamModal";

const AssignTeamModal = ({ children }) => {
  // stater for the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { teams, isLoading } = useSelector((state) => state.teams);

  // useEffect(() => {
  //   dispatch(getTeams());
  // }, []);

  return (
    <div>
      <button className="font-right text-md">assign to a team</button>
    </div>
  );
};

export default AssignTeamModal;
