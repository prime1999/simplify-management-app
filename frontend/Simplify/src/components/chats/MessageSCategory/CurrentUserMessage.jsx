import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { isFirstMessage, isSameSender } from "../../../config/ChatLogic";

const CurrentUserMessage = ({ messages, message, index }) => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className="ml-[80%]">
			<div className="flex items-start">
				<div className="flex flex-row items-start justify-start">
					<h6 className="mr-2 p-2 mt-2 rounded-md text-white bg-navyBlue">
						{message.content}
					</h6>
				</div>
				{isSameSender(messages, message, index, user) ||
					(isFirstMessage(messages, messages, user, index) && (
						<Tooltip title={message.sender.name}>
							<Avatar src={message.sender.pic} />
						</Tooltip>
					))}
			</div>
		</div>
	);
};

export default CurrentUserMessage;
