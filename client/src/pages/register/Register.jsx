import axios from 'axios';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import './register.css'

export default function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cityRef = useRef();
    const fromRef = useRef();

    const handleRegister = async (e) =>{
        e.preventDefault();
        const newUser = ({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            city: cityRef.current.value,
            from: fromRef.current.value,
        });

        try{
            await axios.post("/auth/register", newUser);
            useHistory.push("/login");
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="register">
            <div className="registertitle">
                <span className="registertitles">Lorem ipsum dolor sit amet.</span>
            </div>
            
            <div className="register_container">
            <span className="registerTitle">REGISTER</span>
            <form className="register_form" onSubmit={handleRegister}>
                <div className="registerinput_container">
                    <label>Username</label>
                    <input className="registerinputField" ref={usernameRef} type="text" placeholder="Username.." />
                    <label>Email</label>
                    <input className="registerinputField" ref={emailRef} type="Email" placeholder="Email.." />
                    <label>Password</label>
                    <input className="registerinputField" ref={passwordRef} type="password" placeholder="Password.." />
                    <label>City</label>
                    <input className="registerinputField" ref={cityRef} type="text" placeholder="City" />
                    <label>From</label>
                    <input className="registerinputField" ref={fromRef} type="Text" placeholder="From" />
                    <label>Relationship</label>
                    <input className="registerinputField" type="number" max="3" placeholder="1 for Single / 2 for in a realatioship" />
                </div>
                <button className="btnregister">Register</button>
            </form>
            </div>
        </div>
    )
}
