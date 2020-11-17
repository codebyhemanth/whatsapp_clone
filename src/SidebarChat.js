import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import {useState,useEffect} from "react";
import db from "./firebase";
import { Link } from "react-router-dom";
function SidebarChat({id,name,addnewChat}){

    const [seed,setSeed] = useState(" ");
    const[messages,setMessages]=useState([]);
     
    useEffect(()=>{
        if(id){
           db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
                    setMessages(snapshot.docs.map((doc)=>doc.data())
            ))
        }
    },[id])

    const createChat =()=>{
        const roomName =prompt("enter user name");
        if(roomName!==null || roomName!==""){
            db.collection("rooms").add(
                {
                    name:roomName
                }
            )
        }
    };

    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000));
    }, [])

    return !addnewChat ?(<Link to={`/rooms/${id}`}><div className="sidebarChat">
    <Avatar src=  { `https://avatars.dicebear.com/api/human/${seed}.svg`}/>
    <div className="sidebar_chats_info"> 
        <h2>{name}</h2>
<p>{messages[0]?.message}</p>
    </div>
   </div></Link>
   ):(<div onClick={createChat} className="sidebarChat">
                    <h2>add new chat</h2>

    </div>);
}
export default SidebarChat;