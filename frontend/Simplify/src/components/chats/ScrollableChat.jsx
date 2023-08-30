import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

import OtherUsersMessage from "./MessageSCategory/OtherUsersMessage";
import CurrentUserMessage from "./MessageSCategory/CurrentUserMessage";

const ScrollableChat = () => {
	const { messages, isLoading } = useSelector((state) => state.messages);
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<ScrollableFeed>
				{messages &&
					messages?.map((message, index) =>
						message.sender._id === user.id ? (
							<CurrentUserMessage
								key={message._id}
								message={message}
								messages={messages}
								index={index}
							/>
						) : (
							<OtherUsersMessage
								key={message._id}
								message={message}
								messages={messages}
								index={index}
							/>
						)
					)}
			</ScrollableFeed>
		</>
	);
};
export default ScrollableChat;
