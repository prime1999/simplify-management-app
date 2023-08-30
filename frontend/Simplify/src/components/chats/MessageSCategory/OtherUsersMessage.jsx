import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { isFirstMessage, isSameSender } from "../../../config/ChatLogic";

const OtherUsersMessage = ({ message, messages, index }) => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className="ml-[0]">
			<div className="flex flex-row justify-stretch">
				<div className="mt-2">
					{isSameSender(messages, message, index, user) ||
						(isFirstMessage(messages, messages, user, index) && (
							<Tooltip title={message.sender.name}>
								<Avatar src={message.sender.pic} />
							</Tooltip>
						))}
				</div>
				<div className="flex flex-row">
					<h6 className="ml-2 p-2 mt-2 rounded-md text-black bg-white">
						{message.content}
					</h6>
				</div>
			</div>
		</div>
	);
};

export default OtherUsersMessage;
