import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/Auth/AuthSlice";

const TeamMenu = () => {
  const dispatch = useDispatch();

  const { user, users } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(getUsers());
    };

    fetchUsers();
  }, []);

  console.log(users?.data);

  return <div>dda</div>;
};

export default TeamMenu;
