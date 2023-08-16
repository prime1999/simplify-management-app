import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chip, Avatar } from "@mui/material";

const SelectedUsers = () => {
  const { userList } = useSelector((state) => state.auth);
  console.log(userList);

  const handleDelete = () => {};
  return (
    <div className="mt-4">
      {userList.length !== 0 ? (
        <>
          <div className="flex flex-wrap">
            {userList.map((user) => (
              <Chip
                avatar={<Avatar alt="user pic" src={user.pic} />}
                sx={{
                  margin: "5px 5px",
                }}
                label={user.name}
                variant="outlined"
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectedUsers;
