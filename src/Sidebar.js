import React from 'react';
import "./Sidebar.css";
import { Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChats from './SidebarChat';
import  {useState} from 'react';
import {useEffect} from 'react';
import db from './firebase'
import { useStateValue } from './StateProvider';




 function SideBar(){


    const [rooms,setRooms]= useState([]);
    const[{user},dispatch] =useStateValue();

    useEffect(()=>{
       db.collection("rooms").onSnapshot(snapshot=>(
           setRooms(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
           })))

       ))
    },[])
 

     return(
     <div className="sideBar">
            
            <div className="sideBar_header">
            <Avatar src={user?.photoURL}/>
                <div className="sideBarHeaderRight">
                
                    <IconButton >
                            <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                            <MoreVertIcon/>
                    </IconButton>
                </div>

            </div>
            <div className="sideBar_search">
                <div className="sideBar_searchContainer">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="search chats">
                    </input>

                </div>
            </div>
           <div className="sideBar_chats">
                <SidebarChats addnewChat   />
                {rooms.map(room=>(
                    <SidebarChats key={room.id}  id ={room.id} name={room.data.name}/>

                ))
                }
             
            </div>
     </div>);
 }
 export default SideBar;