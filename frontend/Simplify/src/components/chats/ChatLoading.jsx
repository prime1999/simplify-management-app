import React from "react";
import { Skeleton } from "@mui/material";

const ChatLoading = () => {
	return (
		<>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
			<div style={{ marginTop: "10px" }}>
				<Skeleton variant="rectangular" width={300} height={50} />
			</div>
		</>
	);
};

export default ChatLoading;
