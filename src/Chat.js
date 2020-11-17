import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase"

function Chat(){

    const[{user},dispatch]=useStateValue();
    const [input,setInput] =useState("");
    const {roomId} =useParams();
    const [roomName,setRoomName]=useState("");
    const[messages,setMessages] =useState([]);
    useEffect(() => {
            if(roomId){
                db.collection("rooms").doc(roomId).onSnapshot(snapshot=>(
                    setRoomName(snapshot.data().name)
                ))

                    db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(
                        setMessages(snapshot.docs.map(doc=>doc.data()))
                    ))

            }
        
    }, [roomId])
     
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }

    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_header_info">
                    <h3>
                      {roomName}
                    </h3>
                    <p>last seen at {" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                  
                </div>
                <div className="chat_header_right">
                        <IconButton>
                            <SearchOutlinedIcon/>
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon/>

                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </div>
            </div>
            <div className="chat_body">
                {messages.map(message=>(
                      <p className={`chat_message ${message.name===user.displayName && "chat_reciever"}`}>
                      <span className="chat_name">
                          {message.name}
                      </span>
                      
                      {message.message}
                      <span className="chat_timestamp">
                          {new Date(message.timestamp?.toDate()).toUTCString()}
  
                      </span>
                  </p>
                ))}
              

               

            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input placeholder="type in a message!"  value={input} type="text" onChange={e=>{
                        setInput(e.target.value);
                    }} ></input>
                    <button type="submit"  onClick={sendMessage}>send</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );

}

export default Chat;