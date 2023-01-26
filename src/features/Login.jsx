import React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import $ from "jquery";

// import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ room: "", client: "" });
  function func(event) {
    setState((prev) => {
      console.log(event.target.name);
      if (event.target.name === "room")
        return { ...prev, room: event.target.value };
      else {
        return { ...prev, client: event.target.value };
      }
    });
  }

  async function makeRequest(data) {
    try {
      const result = await $.ajax({
        url: "http://127.0.0.1:8000/",
        data: data,
        method: "POST",
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  function login() {
    localStorage.setItem("room", state.room);
    localStorage.setItem("name", state.client);

    makeRequest({ group_name: state.room }).then((a) => {
      console.log(a);
      if (a.is_first) {
        localStorage.setItem("sym", "X");
      } else {
        localStorage.setItem("sym", "O");
      }
      if (!a.both) {
        navigate("/");
      } else {
        alert("The room is full");
      }
    });
  }
  const generateRoom = async () => {
    const result = await $.ajax({
      url: "http://127.0.0.1:8000/unique/",
      method: "GET",
    });

    setState((prev) => {
      return { ...prev, room: result.room };
    });
    navigator.clipboard.writeText(result.room);
    // console.log(result.room);
  };
  return (
    <div class="total_bg">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          zIndex: "1000",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffffd0",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <TextField
            label="Room Code"
            name="room"
            onChange={func}
            value={state.room}
          />
          <Button
            color="success"
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={generateRoom}
          >
            {`Generate & Copy Room Code`}
          </Button>
          <TextField
            label="Name"
            name="name"
            style={{ marginTop: "10px" }}
            onChange={func}
          />
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={login}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
      <div class="bg_animation">
        <div class="glowing">
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
        </div>
        <div class="glowing">
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
        </div>
        <div class="glowing">
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
          <span class="glow1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
