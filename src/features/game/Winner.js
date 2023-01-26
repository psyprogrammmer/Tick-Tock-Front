export default function check(items) {
	var check = 0;
	var checkWinner = [];
	var win = false;
	var winningItem = "";
	var draw = false;
	for (var i = 0; i < items.length; i++) {
		if (items[i] !== "") {
			check++;
		}
	}
	if (check === 0 || check === 1 || check === 2 || check === 3 || check === 4) {
		checkWinner.push(win, winningItem, draw);
		return checkWinner;
	} else {
		if (
			items[0] !== "" &&
			items[0] === items[1] &&
			items[1] === items[2] &&
			items[0] === items[2]
		) {
			//0,1,2
			win = true;
			winningItem = items[0];
		} else if (
			items[3] !== "" &&
			items[3] === items[4] &&
			items[4] === items[5] &&
			items[3] === items[5]
		) {
			//3,4,5
			win = true;
			winningItem = items[3];
		} else if (
			items[6] !== "" &&
			items[6] === items[7] &&
			items[7] === items[8] &&
			items[6] === items[8]
		) {
			// 6,7,8
			win = true;
			winningItem = items[6];
		} else if (
			items[0] !== "" &&
			items[0] === items[3] &&
			items[3] === items[6] &&
			items[0] === items[6]
		) {
			// 0,3,6
			win = true;
			winningItem = items[0];
		} else if (
			items[1] !== "" &&
			items[1] === items[4] &&
			items[4] === items[7] &&
			items[1] === items[7]
		) {
			// 1,4,7
			win = true;
			winningItem = items[1];
		} else if (
			items[2] !== "" &&
			items[2] === items[5] &&
			items[5] === items[8] &&
			items[2] === items[8]
		) {
			// 2,5,8
			win = true;
			winningItem = items[2];
		} else if (
			items[0] !== "" &&
			items[0] === items[4] &&
			items[4] === items[8] &&
			items[0] === items[8]
		) {
			// 0,4,8
			win = true;
			winningItem = items[0];
		} else if (
			items[2] !== "" &&
			items[2] === items[4] &&
			items[4] === items[6] &&
			items[2] === items[6]
		) {
			// 2,4,6
			win = true;
			winningItem = items[2];
		} else if (check === 9) {
			draw = true;
		} else {
			win = false;
		}

		checkWinner.push(win, winningItem, draw);
		console.log("in function", checkWinner);
		return checkWinner;
	}
}
