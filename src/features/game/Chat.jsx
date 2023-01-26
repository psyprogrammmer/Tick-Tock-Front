import React, { useState, useEffect } from "react";
// import message from "./Messages";
import getDate from "./getDate";
import { useSelector, useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
const Chat = (props) => {
  var room = localStorage.getItem("room");
  var symbols = localStorage.getItem("sym");
  const [downarrow, setDownarrow] = useState(false);

  const [socketUrl, setSocketUrl] = useState(
    "ws://127.0.0.1:8000/ws/chat/" + room + "_chat" + "/" + symbols + "/"
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      // setMessage([...JSON.parse(lastMessage.data)]);
      // JSON.parse(lastMessage.data);
      setMessage([...message, JSON.parse(lastMessage.data)]);
    }
  }, [lastMessage, setMessageHistory]);
  const oppo = useSelector((state) => state.opponent.opponent);
  const [value, setValue] = useState("");
  return (
    <>
      <div id="chat" className="boxes">
        <div
          className="chat-screen notscroll"
          onScroll={() => {
            const scrn = document.querySelector(".chat-screen");
            const scrollbtn = document.querySelector(".botarrow");
            scrn.classList.add("wow");
            scrn.classList.remove("notscroll");

            if (scrn.clientHeight + scrn.scrollTop >= scrn.scrollHeight - 10) {
              setDownarrow(false);
              console.log("scrolled");
            } else {
              setDownarrow(true);
            }

            setTimeout(() => {
              scrn.classList.remove("wow");
              scrn.classList.add("notscroll");
            }, 3000);
          }}
        >
          <div className="mySide">
            {message.map((val, index) => {
              console.log(val);
              let clas =
                val.msg_sym == localStorage.getItem("sym")
                  ? "my-msg"
                  : "oth-msg";
              let label =
                val.msg_sym == localStorage.getItem("sym") ? "You" : "He";
              return (
                <>
                  <div className={clas} key={index}>
                    <label>
                      {val.label === localStorage.getItem("name")
                        ? "You"
                        : val.label}
                    </label>
                    <div>{val.msg}</div>
                    <span>{val.time}</span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="txtarea">
          <textarea
            name="message"
            placeholder="Enter message here"
            id="msg-box"
            cols="30"
            rows="2"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></textarea>
          <Button
            variant="contained"
            color="error"
            style={{ margin: "10px 0" }}
            onClick={() => {
              if (!oppo) {
                return;
              }
              if (value !== "") {
                sendMessage(
                  JSON.stringify({
                    msg: value,
                    msg_sym: localStorage.getItem("sym"),
                    label: localStorage.getItem("name"),
                    time: getDate(),
                  })
                );
              }
              setValue("");
            }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
