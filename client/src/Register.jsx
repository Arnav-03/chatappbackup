/* import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UserContext } from './UserContext';
import { useRef } from 'react';


import w1 from './assets/w6.jpg';
import back from './assets/back.png';

const Register = () => {



    const { setusername: setLoggedInUsername, setid } = useContext(UserContext);

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [IsloginOrRegister, setIsloginOrRegister] = useState("login");

    const [loginStatus, setLoginStatus] = useState(false); // Use boolean instead of an empty string
    const [loginerror, setError] = useState(false); // Use boolean instead of an empty string
    const [show, setshow] = useState(true);

 
     async function handlesubmit(e) {
        e.preventDefault();
        const url = IsloginOrRegister === "register" ? 'register' : 'login';

        let loginSuccess = false;

        try {
            const { data } = await axios.post(`/${url}`, { username, password });
            setLoggedInUsername(username);
            setid(data.id);
            loginSuccess = true;
            console.log(error);
        } catch (err) {
            console.log(err);
        }

        if (loginSuccess) {
            setLoginStatus(true); // Set loginStatus to true when successfully logging in
            setError(false); // No error when successful
        } else {
            setError(true); // Set error to true for invalid username or password
            setLoginStatus(false); // Set loginStatus to false due to login failure
        }
    }
 


    const mainstyle = {
        fontFamily: "'Major Mono Display', monospace",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textShadow: '3px 3px #d1a1a1',

    }

    const textStyle = {
        fontFamily: "'Qwigley', cursive",
    };

    const scrollRef = useRef(null);


    const handleButtonClick = () => {
        setshow(false);
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="">


            {show && (
                <div className="flex  flex-col p-5 relative h-screen"
                    style={{
                        backgroundImage: `url(${w1})`, backgroundSize: 'cover', filter: 'blur(0px)'
                        , opacity: '1',
                    }}
                >

                    <div style={mainstyle} className=" flex mt-[250px] tracking-in-expand  text-[#a85a5a] text-[47px]   sm:text-6xl md:text-7xl lg:text-8xl"
                    >KASHITOKARU</div>
                    <div className="text-[#13090a]  font-bold text-[33px]  sm:text-4xl md:text-4xl lg:text-5xl text-center p-0 mt-[50px] " style={textStyle}>
                        The Art of Conversation,<br/> Redefined...
                    </div>


                    <div className='flex justify-end m-0 mt-[100px] mr-[20px] lg:mt-[2px] lg:mr-[150px]'>
                        <button class="button" onClick={handleButtonClick} >
                            get started
                        </button>
                    </div>
                </div>
            )}



            {!show && (
                <div ref={scrollRef}
                    style={{
                        backgroundImage: `url(${w1})`, backgroundSize: 'cover', filter: 'blur(0px)'
                        , opacity: '1',
                    }}
                    className='bg-cyan-400 h-screen   p-0 m-0  flex flex-col  '>
                    <div className=""><img onClick={() => { setshow(true) }}
                        className='h-10 mt-[200px] ml-[20px] lg:ml-[400px]  cursor-pointer'
                        src={back} alt="" /></div>


                    <form  
                    className='w-100 backg mx-auto' onSubmit={handlesubmit}>
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
                                    <button className='text-fuchsia-950 underline font-bold ml-2' onClick={() => setIsloginOrRegister('login')}>
                                        Login here
                                    </button>
                                </div>
                            )}
                            {IsloginOrRegister === "login" && (
                                <div> Don't have an account?
                                    <button className='text-fuchsia-950 underline font-bold outline-none ml-2' onClick={() => setIsloginOrRegister('register')}>
                                        Register
                                    </button>

                                </div>
                            )}

                        </div>

                        {loginStatus && <div className="text-green-600">Logging in...</div>}
                        {loginerror && <div className="text-red-600">Invalid username or password</div>}

                    </form>
                </div>
            )}












        </div>

    )
}

export default Register
 */
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UserContext } from './UserContext';
import { useRef } from 'react';


import w1 from './assets/w6.jpg';
import back from './assets/back.png';

const Register = () => {



    const { setusername: setLoggedInUsername, setid } = useContext(UserContext);

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [IsloginOrRegister, setIsloginOrRegister] = useState("login");

    const [loginStatus, setLoginStatus] = useState(false); // Use boolean instead of an empty string
    const [loginerror, setError] = useState(false); // Use boolean instead of an empty string
    const [show, setshow] = useState(true);

 
     async function handlesubmit(e) {
        e.preventDefault();
        const url = IsloginOrRegister === "register" ? 'register' : 'login';

        let loginSuccess = false;

        try {
            const { data } = await axios.post(`/${url}`, { username, password });
            setLoggedInUsername(username);
            setid(data.id);
            loginSuccess = true;
            console.log(error);
        } catch (err) {
            console.log(err);
        }

        if (loginSuccess) {
            setLoginStatus(true); // Set loginStatus to true when successfully logging in
            setError(false); // No error when successful
        } else {
            setError(true); // Set error to true for invalid username or password
            setLoginStatus(false); // Set loginStatus to false due to login failure
        }
    }
 


    const mainstyle = {
        fontFamily: "'Major Mono Display', monospace",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textShadow: '3px 3px #d1a1a1',

    }

    const textStyle = {
        fontFamily: "'Qwigley', cursive",
    };

    const scrollRef = useRef(null);


    const handleButtonClick = () => {
        setshow(false);
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="">


            {show && (
                <div className="flex  flex-col p-5 relative h-screen"
                    style={{
                      background:"#FFE0F7"
                    }}
                >

                    <div style={mainstyle} className=" flex mt-[250px] tracking-in-expand  text-[#a85a5a] text-[47px]   sm:text-6xl md:text-7xl lg:text-8xl"
                    >KASHITOKARU</div>
                    <div  className="  text-[#452563] font-bold text-[33px]  sm:text-4xl md:text-4xl lg:text-5xl text-center p-0 mt-[50px] " style={textStyle}>
                        The Art of Conversation,<br/> Redefined...
                    </div>
                   {/*  text-[#13090a] */}
 
                    <div className='flex justify-end m-0 mt-[100px] mr-[20px] lg:mt-[2px] lg:mr-[150px]'>
                        <button class="button" onClick={handleButtonClick} >
                            get started
                        </button>
                    </div> 
                </div>
            )}



            {!show && (
                <div ref={scrollRef}
                    
                    className=' h-screen   p-0 m-0  flex flex-col  '>
                    <div className=""><img onClick={() => { setshow(true) }}
                        className='h-10 mt-[200px] ml-[20px] lg:ml-[400px]  cursor-pointer'
                        src={back} alt="" /></div>


                    <form  
                    className='w-100 backg mx-auto' onSubmit={handlesubmit}>
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
                                    <button className='text-fuchsia-950 underline font-bold ml-2' onClick={() => setIsloginOrRegister('login')}>
                                        Login here
                                    </button>
                                </div>
                            )}
                            {IsloginOrRegister === "login" && (
                                <div> Don't have an account?
                                    <button className='text-fuchsia-950 underline font-bold outline-none ml-2' onClick={() => setIsloginOrRegister('register')}>
                                        Register
                                    </button>

                                </div>
                            )}

                        </div>

                        {loginStatus && <div className="text-green-600">Logging in...</div>}
                        {loginerror && <div className="text-red-600">Invalid username or password</div>}

                    </form>
                </div>
            )}












        </div>

    )
}

export default Register
