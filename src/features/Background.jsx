import React, { useEffect } from "react";
import backgroundmusic from "./Sounds/music.mp3";
import { Howl, Howler } from "howler";
import { useSelector, useDispatch } from "react-redux";
const Background = () => {
	var sound = new Howl({
		src: [backgroundmusic],
		loop: true,
	});
	const val = useSelector((state) => state.volume.value);
	useEffect(() => {
		sound.play();
		Howler.volume(val);
	}, []);
	useEffect(() => {
		Howler.volume(val);
	}, [val]);
	function some() {
		console.log(backgroundmusic);

		Howler.volume(0.5);
	}
	function stop() {
		sound.stop();
	}
	return <></>;
};

export default Background;
