import { useState, useContext } from 'react';
import Topbar from '../../components/topbar/Topbar'
import './settings.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import { useHistory } from 'react-router';
import { UpdateStart, UpdateSuccess, UpdateFailure} from '../../context/AuthActions'

export default function Settings() {
    
    const { user, dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [from, setFrom] = useState("");

    const handleClick = async (e) =>{
        e.preventDefault();
        dispatch(UpdateStart());
        const updateUser = {
            userId: user._id,
            username,
            email,
            password,
            city,
            from,
        };

        try{
            await axios.put("/users/" + user._id, updateUser,{
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            });
            dispatch(UpdateSuccess(updateUser));
            history.push("/");

        }catch(err){
            dispatch(UpdateFailure());
        }
    };
    return (
        <>
            <Topbar/>
            <div className="setting">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form onSubmit={handleClick}>
                    <div className="form_container">
                        <label className="accountDetails">Account Details</label>
                        <label>Username</label>
                        <input className="inputField" type="text" required onChange={(e) => setUsername(e.target.value)} placeholder={user?.username} />
                        <label>Email</label>
                        <input className="inputField" type="Email" required onChange={(e) => setEmail(e.target.value)} placeholder={user?.email} />
                        <label>Password</label>
                        <input className="inputField" required onChange={(e) => setPassword(e.target.value)} type="password"/>
                        <label>City</label>
                        <input className="inputField" required onChange={(e) => setCity(e.target.value)} placeholder={user?.city} type="text"/>
                        <label>From</label>
                        <input className="inputField" required onChange={(e) => setFrom(e.target.value)} placeholder={user?.from} type="text"/>
                        <button className="settingsSubmit" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
