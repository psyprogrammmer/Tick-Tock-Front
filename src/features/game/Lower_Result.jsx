import React from "react";
import Volume from "./Volume";
import { useSelector, useDispatch } from "react-redux";
import { setOpponent } from "./ResultSlice";
const Lower_Result = () => {
	const oppo = useSelector((state) => state.opponent.opponent);
	return (
		<div className="low_div">
			<div className="player12">
				<div className="rooms">
					<p className="room_low_div">Room: </p>
					<p className="roomcode_low_div">{localStorage.getItem("room")}</p>
				</div>
				<div className="meVsOpponent">
					{oppo !== "Disconnected" ? (
						<>
							<p className="me">You</p>
							<p className="Vs">Vs</p>
							<p className="opponent">{oppo}</p>
						</>
					) : (
						<>
							<p>Connection Closed !</p>
						</>
					)}
				</div>
			</div>
			<div className="volumeBar_low_div">
				<Volume />
			</div>
		</div>
	);
};

export default Lower_Result;
