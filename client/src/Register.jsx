import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UserContext } from './UserContext';
const Register = () => {



    const { setusername: setLoggedInUsername, setid } = useContext(UserContext);

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [IsloginOrRegister, setIsloginOrRegister] = useState("login");



    async function handlesubmit(e) {
        e.preventDefault();
        const url = IsloginOrRegister === "register" ? 'register' : 'login';
        const { data } = await axios.post(`/${url}`, { username, password });
        setLoggedInUsername(username);
        setid(data.id);
    }
    const divStyle = {
        clipPath: 'polygon(26% 28%, 75% 28%, 75% 75%, 61% 75%, 48% 87%, 50% 75%, 26% 75%)',
      };
    return (
        <div className="bg-cyan-200">
 <div  style={divStyle}
        className='bg-cyan-400 h-screen p-0 m-0 flex items-center '>
            <form className='w-64 mx-auto' onSubmit={handlesubmit}>
                <input type='text' onChange={(e) => setusername(e.target.value)} placeholder='username' value={username}
                    className='block w-full p-2 mb-5' />
                <input type='password' onChange={(e) => setpassword(e.target.value)} placeholder='password' value={password}
                    className='block w-full p-2 mb-5' />
                <button className='bg-cyan-500 text-white block w-full rounded p-2 mb-5'>
                    {(IsloginOrRegister == "register" ? "Register" : "Login")}
                </button>
                <div>

                    {IsloginOrRegister === "register" && (
                        <div> Already a member?
                            <button className='text-fuchsia-950 underline font-bold ml-2' onClick={()=> setIsloginOrRegister('login')}>
                                Login here
                            </button>
                        </div>
                )}
                       {IsloginOrRegister === "login" && (
                        <div> Don't have an account?
                            <button className='text-fuchsia-950 underline font-bold outline-none ml-2' onClick={()=>setIsloginOrRegister('register')}>
                                Register
                            </button>
                        </div>
                )}
                
               </div>
            </form>
        </div>
        </div>
       
    )
}

export default Register
