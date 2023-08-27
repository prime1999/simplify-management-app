import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chip, Avatar } from "@mui/material";
import { removeSelectedUser } from "../../../features/Auth/AuthSlice";

const SelectedUsers = () => {
	const { userList } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleDelete = (userId) => {
		dispatch(removeSelectedUser(userId));
	};
	return (
		<div className="mt-4">
			{userList.length !== 0 ? (
				<>
					<div className="flex flex-wrap">
						{userList.map((user) => (
							<Chip
								key={user._id}
								avatar={<Avatar alt="user pic" src={user.pic} />}
								sx={{
									margin: "5px 5px",
								}}
								label={user.name}
								variant="outlined"
								onDelete={() => handleDelete(user._id)}
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
