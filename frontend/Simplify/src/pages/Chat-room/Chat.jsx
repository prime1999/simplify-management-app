import React from "react";
import MyChat from "../../components/chats/MyChat";
import ChatBox from "../../components/chats/ChatBox";

const Chat = () => {
	return (
		<div>
			<div className="w-[97%] mx-auto h-screen flex">
				<MyChat />
				<ChatBox />
			</div>
			<div>
				<h4 className="text-center text-md text-darkGray my-4">
					&copy; 2023 EMINENCE, All rights reserved
				</h4>
			</div>
		</div>
	);
};

export default Chat;
