import './Login.css'
import React from 'react';
import {Button} from "@material-ui/core"
import {auth,provider} from "./firebase"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login(){
    const [{user},dispatch]=useStateValue();
    const signIn=()=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user: result.user
            });
            
        }).catch(err=>{console.log(err)})

    }
    return(
        <div className="login">
            <div className="login_container">
                <img src="https://www.androidpolice.com/wp-content/uploads/2020/04/whatsapp-forward-restriction-hero.png"
                alt=""/>
                <div className="login_text">
                    <h1>login to your account 🌎</h1>
                </div>
                <Button onClick={signIn} className="login_button">
                    SIGN IN WITH GOOGLE!
                </Button>
            </div>
        </div>
            
    )
}


export default Login;