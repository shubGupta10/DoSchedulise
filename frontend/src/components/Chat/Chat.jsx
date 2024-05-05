import React, { useEffect } from "react";
import { user } from "../Join/Join.jsx";
import socketIo from 'socket.io-client'
import { toast } from "react-toastify";
import sendLogo from '../../ChatLoginImage/send.png';

const ENDPOINT= 'http://localhost:5000';


const Chat = () => {


    const socket = socketIo(ENDPOINT, {transports: ['websocket']});

   useEffect(() => {
    socket.on("connect", () => {
        toast.success("User Connected");
    })
   }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
            <input type="text" id="chatInput"/>
            <button className="sendBtn"><img src={sendLogo} alt="Send" /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
