import React, { useContext } from 'react'
import { useEffect, useState, useRef } from 'react';
import sendbtn from './assets/send.png';
import chatimg from './assets/chat.png';
import attach from './assets/attach.png';
import { UserContext } from './UserContext';
import Start from './Start';
import _ from 'lodash';
import axios from 'axios';
import * as themes from './Colors';
import search from './assets/search.png';
import cross from './assets/cross.png';
import setting from './assets/setting.png';
import account from './assets/account.png';
import image from './assets/image.png';
import file from './assets/file.png';
import pdf from './assets/pdf.png';
import excel from './assets/excel.png';
import txt from './assets/txt.png';
import doc from './assets/doc.png';
import backarrow from './assets/backarrow.png';
import ppt from './assets/ppt.png';

const Chat = () => {

    const [ws, setws] = useState(null);
    const [onlinePeople, setonlinePeople] = useState({});
    const [selectedUser, setselectedUser] = useState(null);
    const [newMessage, setnewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { username, id, setid, setusername } = useContext(UserContext);
    const [People, setPeople] = useState({});
    const divUnderMEssage = useRef(null);
    const [sidebarVisible, setSidebarVisible] = useState(true); // State to manage sidebar visibility
    const [showsearch, setshowsearch] = useState(false);
    const [storedTimestamp, setStoredTimestamp] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState({});
    const [notificationpeople, setnotificationpeople] = useState({});
    const [selectedFile, setSelectedFile] = useState(true);

    const [leftVisible, setLeftVisible] = useState(true);
    const [rightVisible, setRightVisible] = useState(false);

    const handleBackArrowClick = () => {
        var w = window.innerWidth;

        if (w < 768) {
            setLeftVisible(!leftVisible);
            setRightVisible(!rightVisible);
        }
    };


    //making connection to websocket
    useEffect(() => {
        connectTOWs();
    }, [selectedUser]);

    function connectTOWs() {
        const serverUrl = import.meta.env.VITE_WS_SERVER_URL;
        const ws = new WebSocket(serverUrl);
        setws(ws);

        ws.addEventListener('message', handlemessage);
        ws.addEventListener('close', () => {
            setTimeout(() => {
                console.log('trying to reconnect');
                connectTOWs();
            }, 1000);
        });
    }


    useEffect(() => {
        axios.get('/people').then(res => {
            const PeopleArr = res.data.filter(p => p._id !== id)
            const People = {};
            PeopleArr.forEach(p => {
                People[p._id] = p;
            });
            setPeople(People);
        });

    }, [selectedUser, id, onlinePeople, People, messages, newMessage]);

    const [nhk, setnhk] = useState(false);
    /*     function handlemessage(e) {
            const messageData = JSON.parse(e.data);
    
    
            if (typeof messageData === 'object' && 'online' in messageData) {
                showPeople(messageData.online);
            } else if ('text' in messageData) {
                const isMessageForSelectedUser = messageData.sender === selectedUser || messageData.recipient === selectedUser;
    
                if (isMessageForSelectedUser) {
                    setMessages(prevMessages => [...prevMessages, { ...messageData, isOur: false }]);
                    setnhk(prevnhk => !prevnhk);
                    setTimeout(() => {
                        setnhk(prevnhk => !prevnhk);
    
                    }, 1000);
                }
    
            }
        } */
        const showPeople = (onlineData) => {
           
        };
    function handlemessage(e) {
        const messageData = JSON.parse(e.data);


        if (typeof messageData === 'object' && 'online' in messageData) {
            showPeople(messageData.online);
        } else if ('text' in messageData) {
            const isMessageForSelectedUser = messageData.sender === selectedUser || messageData.recipient === selectedUser;

            if (isMessageForSelectedUser) {
                setMessages(prevMessages => [...prevMessages, { ...messageData, isOur: false }]);
                setnhk(prevnhk => !prevnhk);
                setTimeout(() => {
                    setnhk(prevnhk => !prevnhk);

                }, 1000);
            }

        }
    }
    useEffect(() => {
        setTimeout(() => {
            if (selectedUser) {
                axios.get('/messages/' + selectedUser).then(res => {
                    setMessages(res.data);
                });
            }
            setTimeout(() => {
                if (selectedUser) {
                    axios.get('/messages/' + selectedUser).then(res => {
                        setMessages(res.data);
                    });
                }
            }, 1000);
            setTimeout(() => {
                if (selectedUser) {
                    axios.get('/messages/' + selectedUser).then(res => {
                        setMessages(res.data);
                    });
                }
            }, 500);
        }, 1000);

    }, [nhk]);

    useEffect(() => {
        setTimeout(() => {
            if (selectedUser) {
                axios.get('/messages/' + selectedUser).then(res => {
                    setMessages(res.data);
                    // Reset unread messages count for the selected user
                    setUnreadMessages(prevUnread => ({
                        ...prevUnread,
                        [selectedUser]: 0,
                    }));
                });
            }
        }, 1000);
    }, [nhk]);


    const [fllag, setfllag] = useState(false);


    function sendMessage(e, file = null) {
        if (e) e.preventDefault();

        const createdAt = new Date();
        const day = createdAt.toLocaleDateString('en-US');
        const time = createdAt.toLocaleTimeString('en-US');

        // Check if there is a file
        if (file) {
            // Send the file message
            ws.send(JSON.stringify({
                day,
                time,
                recipient: selectedUser,
                file,
                isRead: false,
                createdAt,
            }));

            // Update state and fetch messages if needed
            setnewMessage('');
            axios.get('/messages/' + selectedUser).then(res => {
                setMessages(res.data);
            });

            // Send the text message after a delay
            setTimeout(() => {

                const textMessage = `${file.name}`;
                ws.send(JSON.stringify({
                    day,
                    time,
                    recipient: selectedUser,
                    text: textMessage,
                    isRead: false,
                    createdAt,
                }));
                setnhk(prevnhk => !prevnhk);

                // Update state with the new message data
                setMessages(prev => ([...prev, {
                    day,
                    time,
                    text: textMessage,
                    sender: id,
                    isRead: false,
                    recipient: selectedUser,
                    _id: Date.now(),
                    isOur: true,
                    createdAt,
                }]));
                setnhk(prevnhk => !prevnhk);

            }, 2000);
            setnhk(prevnhk => !prevnhk);


        } else {
            // Check if the newMessage is empty or contains only whitespace
            if (!newMessage.trim()) {
                // Do not send empty messages
                return;
            }

            // Send the text message with the correct timestamps
            ws.send(JSON.stringify({
                day,
                time,
                recipient: selectedUser,
                text: newMessage,
                isRead: false,
                createdAt,
            }));

            // Update state with the new message data
            setnewMessage('');
            const newMessageData = {
                day,
                time,
                text: newMessage,
                sender: id,
                isRead: false,
                recipient: selectedUser,
                _id: Date.now(),
                isOur: true,
                createdAt,
            };

            setMessages(prev => ([...prev, newMessageData]));
        }
    }


    function sendfile(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            sendMessage(null, {
                name: e.target.files[0].name,
                data: reader.result,
            })
        }
        setTimeout(() => {
            if (selectedUser) {
                axios.get('/messages/' + selectedUser).then(res => {
                    setMessages(res.data);
                });
            }
        }, 1000);

    }
    const [scrollonclick, setscrollonclick] = useState(false);
    //scroll to bottom
    useEffect(() => {

        const div = divUnderMEssage.current;
        if (div) {
            div.scrollIntoView({ behaviour: 'smooth' });
        }
    }, [messages, scrollonclick]);

    //get messages
    useEffect(() => {
        if (selectedUser) {
            axios.get('/messages/' + selectedUser).then(res => {
                setMessages(res.data);
            });
        }
    }, [selectedUser]);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return ''; // If the timestamp is missing or invalid, return an empty string

        const date = new Date(timestamp);

        if (isNaN(date.getTime())) {
            return ''; // If the date is invalid, return an empty string
        }

        // Get date components
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        // Get time components
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return ` ${hours}:${minutes}`;
    };


    const onlinePeopleExcludingUser = { ...onlinePeople };
    delete onlinePeopleExcludingUser[id];

    const messagesWithoutDupe = _.uniqBy(messages, '_id');


    //logout
    function logout() {
        axios.post('/logout').then(() => {
            setws(null);
            setid(null);
            setusername(null);
        })
    }


    const textStyle = {
        fontFamily: "'Yellowtail', cursive", whiteSpace: 'normal',
    };


    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        const term = e.target.value;


        setSearchTerm(term);

        try {
            const response = await axios.get(`/allpeople?searchTerm=${term}`);
            const { exists, users } = response.data;

            if (exists) {
                // Users exist in the database
                setSearchResults(users);
                console.log(users);
            } else {
                // No matching users found
                console.log("no user found");
                setSearchResults([]);

            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        // Function to handle selecting a user from search results

    };
    const handleSelectUser = (userId) => {
        setselectedUser(userId); // Set the selectedUser when a user is clicked
        setSidebarVisible(false); // Hide the sidebar

        // Update People list instantly
        axios.get('/people').then(res => {
            const PeopleArr = res.data.filter(p => p._id !== id)
            const updatedPeople = {};
            PeopleArr.forEach(p => {
                updatedPeople[p._id] = p;
            });

            // Merge the updated people list with the existing one using spread operator
            setPeople(prevPeople => ({ ...prevPeople, ...updatedPeople }));

        });

    };


    const [rerenderFlag, setRerenderFlag] = useState(false);

    // Function to trigger re-render every second
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the flag to trigger re-render
            setRerenderFlag(prevFlag => !prevFlag);
        }, 1000);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    function getCurrentTimestamp() {
        const date = new Date();
        const day = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        return { day, time };
    }

    const [setuuser, setsetuuser] = useState("");
    /* *******************************************************************************************************
     */

    const [showsettings, setshowsettings] = useState(false);
    const [showtheme, setshowtheme] = useState(false);
    const [showlogout, setshowlogout] = useState(false);


    const [colortheme, setcolortheme] = useState("main_theme");
    const allThemes = themes;



    const lavenderTheme = allThemes[colortheme];

    function getImageForFileType(file) {

        if (file.endsWith('.pdf')) {
            return pdf;
        } else if (file.endsWith('.doc') || file.endsWith('.docx')) {
            return doc;
        } else if (file.endsWith('.txt')) {
            return txt;
        } else if (file.endsWith('.xls') || file.endsWith('.xlsx') || file.endsWith('.csv')) {
            return excel;
        } else if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            return image;
        } else if (file.endsWith('.ppt') || file.endsWith('.pptx')) {
            return ppt;
        } else {
            return file;
        }
    }


    const [lastMessageTimes, setLastMessageTimes] = useState({});
    const getLastMessageTime = async (userId) => {
        try {
            const ourUserId = 'yourLoggedInUserId'; // Replace with the actual logged-in user's ID
            const response = await axios.get(`/messages/${userId}`);
            const lastMessage = response.data.length > 0 ? response.data[response.data.length - 1] : null;

            if (lastMessage) {
                const { createdAt } = lastMessage;
              /*   const messageTime = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); */
              const messageTime = new Date(createdAt).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

                return messageTime;
            }
        } catch (error) {
            console.error('Error fetching last message time:', error.message);
        }

        return 'No messages';
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if(selectedUser!==null){
                    const response = await axios.get(`/messages/${selectedUser}`);
                    setMessages(response.data);
                }
            
            } catch (error) {
                console.error('Error fetching messages:', error.message);
            }
        };

        fetchMessages();
    }, [selectedUser]);

    useEffect(() => {
        const fetchLastMessageTimes = async () => {
            const times = {};
            for (const userId of Object.keys(People)) {
                const time = await getLastMessageTime(userId);
                times[userId] = time;
            }
            setLastMessageTimes(times);
        };

        fetchLastMessageTimes();
    }, [People,messages,selectedUser]);

    return (


        <div className='flex h-screen '>
            <div style={{ background: lavenderTheme.left_color }}

                className={` min-[320px] w-full  lg:w-1/3 md:w-1/3 h-full flex flex-col p-1 mb-10 ${leftVisible ? '' : 'hidden'}`}>
                <div style={{ background: lavenderTheme.title_color, color: lavenderTheme.left_color_text }}

                    className={`text-center  my-1  w-full p-1 mt-0 rounded-[10px] `}>
                    <span style={textStyle} className=' mx-2  capitalize   text-2xl  md:text-lg lg:text-2xl xl:text-4xl tracking-[.16em]'>
                        {username}
                    </span>
                </div>
                <div style={{ background: lavenderTheme.toolbox_theme }}
                    className="  rounded-[10px] w-full m-2 ml-0 p-1  flex flex-row justify-around">
                    <img onClick={() => setshowsettings(true)}
                        className='h-[30px] mf:  cursor-pointer ' src={setting} alt="" />
                    <div className="text-white font-bold text-xl border-white cursor-pointer border-[2px] border-t-0 border-b-0 p-5 pt-0 pb-0">status</div>
                    <img onClick={() => { setshowsearch(true) }} className='h-[30px] cursor-pointer' src={search} alt="" />

                </div>

                {showsettings && (
                    <div className="bg-[#444e53] flex flex-col rounded-2xl p-2 py-3 mb-7 ">
                        <div onClick={() => setshowsettings(false)} className="flex justify-end  cursor-pointer">
                            <img
                                className="w-[40px]  bg-[#363838] rounded-full" src={cross} alt="Close Settings"></img>
                        </div>

                        <div className="italic text-[#d5d9db] font-bold text-[32px] text-center p-0 mt-[-20px]">Settings</div>

                        <ul className='p-4 text-[#d4e1e7] font-extrabold capitalize cursor-pointer text-[20px]'>
                            <li onClick={() => setshowtheme(!showtheme)}
                                className='border-b-[1px] border-[#bacad3]'>Themes</li>
                            {showtheme && (
                                <ul className='p-4 text-[20px] font-extralight'>
                                    <li onClick={() => setcolortheme("main_theme")}
                                        className='flex '><div className="flex justify-end h-[20px] w-[20px] rounded-full bg-[#364954] mt-0.5 mr-4 border-[2px]"></div>Default </li>
                                    <li onClick={() => setcolortheme("dark_theme")}
                                        className='flex '><div className="flex justify-end h-[20px] w-[20px] border-[2px] rounded-full bg-black mt-0.5 mr-4 "></div>dark </li>
                                    <li onClick={() => setcolortheme("lavender_theme")}
                                        className='flex '><div className="flex justify-end h-[20px] w-[20px]  border-[2px] rounded-full bg-[#b794d2] mt-0.5 mr-4 "></div>lavender </li>
                                    <li onClick={() => setcolortheme("pink_theme")}
                                        className='flex '><div className="flex justify-end h-[20px] w-[20px] border-[2px] rounded-full bg-[#9F004B] mt-0.5 mr-4 "></div>Rose Garnet </li>
                                    <li onClick={() => setcolortheme("blue_theme")}
                                        className='flex '><div className="flex justify-end h-[20px] w-[20px]  border-[2px] rounded-full bg-[#2AB1A9] mt-0.5 mr-4 "></div>Light Sea Green </li>

                                </ul>
                            )}


                            <li onClick={() => setshowlogout(true)} className='border-b-[1px] border-[#bacad3]'>Logout</li>
                            {showlogout && (
                                <div className=" p-3 rounded-3xl justify-around">
                                    <div className="text-center   font-extralight text-[16px]  mt-4"> Are you sure you want to logout?</div>
                                    <div className="mt-4 flex flex-row justify-around">
                                        <div onClick={() => setshowlogout(false)}
                                            className="bg-white p-3 rounded-2xl px-10 text-black ">no</div>
                                        <div onClick={logout}
                                            className="bg-red-700 p-3 rounded-2xl px-10 ">yes</div>
                                    </div>
                                </div>
                            )}





                        </ul>
                    </div>
                )}


                <div style={{ background: lavenderTheme.chat_title_theme }}
                    className="flex flex-row justify-center   h-[30px] rounded-lg text-white font-bold text-4xl md:text-2xl lg:text-3xl   text-center py-6  mb-0">
                    <div className="mt-[-20px]">Chats</div>
                    {<img className='h-10 mt-[-15px] md:h-8 ' src={chatimg} />}</div>
                <div>


                    {/* search */}
                    {showsearch && (<div >
                        <div className="flex flex-row">
                            <input
                                className={`${lavenderTheme.search_bar_and_text} bg-transparent  border-[1px] rounded-[10px] font-mono h-9 outline-none  w-full  p-3 pl-10 pr-10 m-2 ml-0 mb-1 font-bold`}
                                type="text"
                                placeholder="Search by username..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e)}
                            />
                            <img onClick={() => { setshowsearch(false) }} className={`${lavenderTheme.search_cross} h-[30px]   mt-[10px] rounded-[10px] ml-[-43px]`} src={cross}></img>
                        </div>

                        {searchTerm.length > 0 && (
                            <ul className={`${lavenderTheme.search_box}
                            bg-transparent rounded-[10px] p-3 mb-4 w-full border-[1px]  overflow-scroll max-h-[200px]`}>
                                {searchResults.length > 0 ? (
                                    searchResults.map((user) => (

                                        <li
                                            className={` ${lavenderTheme.search_border_and_text} flex flex-row cursor-pointer overflow-hidden  font-mono lg:text-[20px] sm:text-[12px]  font-bold`} key={user.id}
                                            onClick={() => {
                                                handleSelectUser(user._id);
                                                handleBackArrowClick();
                                            }}>
                                            <img style={{ background: lavenderTheme.search_account_theme }}
                                                className='lg:h-[25px] min-[320px]:h-[20px] mt-[3px] rounded-full m-[3px] mr-4 ' src={account}></img>
                                            {user.username}
                                        </li>
                                    ))
                                ) : (
                                    <div className="flex justify-center">
                                        <li className={` ${lavenderTheme.search_not_found} border-b-2  font-mono  font-bold `}>No User found !!!</li>

                                    </div>
                                )}
                            </ul>
                        )}

                    </div>)}
                </div>
                {/*       <div
                    className="overflow-y-auto mm-5 h-full">
                    {
                        Object.values(People).map((user) => (
                            <div onClick={() => { setselectedUser(user._id); handleBackArrowClick(); setscrollonclick(prevscrollonclick => !prevscrollonclick); }}
                                key={user._id}
                                className={`cursor-pointer flex flex-row overflow-hidden  my-1   h-11 font-bold px-3 py-2.5 text-lg  md:text-[15px] lg:text-xl  rounded-r-[10px] ${user._id === selectedUser ? `${lavenderTheme.username_theme_selected}` : `${lavenderTheme.username_theme_not_selected}`}`}
                            >

                                <div
                                    className={`${user._id === selectedUser
                                        ? `${lavenderTheme.alphabet_theme_selected}`
                                        : `${lavenderTheme.alphabet_theme_not_selected}`
                                        } h-8 capitalize w-8 rounded-full px-1.5 py-0 mr-5 mt-[-5px] text-m text-center`}
                                >
                                    {user.username[0]}
                                </div>
                                <span className='mt-[-3px] md:mt-[-5px] '> {user.username} </span>
                            </div>
                        ))

                    }



                </div> */}

                <div className="overflow-y-auto mm-5 h-full">
                    {Object.values(People).map((user) => (
                        <div
                            onClick={() => {
                                setselectedUser(user._id);
                                handleBackArrowClick();
                                setscrollonclick((prevscrollonclick) => !prevscrollonclick);
                            }}
                            key={user._id}
                            className={`cursor-pointer flex flex-row overflow-hidden my-1 h-11 font-bold px-3 py-2.5 text-lg md:text-[15px] lg:text-xl rounded-r-[10px] ${user._id === selectedUser
                                ? `${lavenderTheme.username_theme_selected}`
                                : `${lavenderTheme.username_theme_not_selected}`
                                }`}
                        >
                            <div
                                className={`${user._id === selectedUser ? `${lavenderTheme.alphabet_theme_selected}` : `${lavenderTheme.alphabet_theme_not_selected}`} h-8 capitalize w-8 rounded-full px-1.5 py-0 mr-5 mt-[-5px] text-m text-center`}
                            >
                                {user.username[0]}
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <div className="mt-[-3px] md:mt-[-5px]">
                                    {user.username}
                                </div>
                                <div className="text-[12px] mt-[-3px] text-[#868b96]">
                                    {lastMessageTimes[user._id]}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

            <div
                style={{ background: lavenderTheme.left_color }}
                className={`flex flex-col  ack min-[320px]:w-full sm:w-full  md:block md:w-full lg:block lg:w-2/3  overflow-hidden ${rightVisible ? '' : 'hidden'}`}>


                {!selectedUser && <Start />}
                {!!selectedUser &&
                    <div className="flex flex-col h-full border-l-[3px] border-black overflow-y-auto">
                        <div
                            className={`${lavenderTheme.chatting_with_theme} flex flex-row items-center justify-center text-white py-3 text-center font-bold text-xl lg:text-2xl sticky top-0`}>
                            <div>
                                <img className="h-10 mt-[3px] pb-0 ml-5 md:hidden" src={backarrow} onClick={handleBackArrowClick}></img>
                            </div>
                            <div className="flex-grow text-center">
                                Chatting with: <span
                                    className={`${lavenderTheme.chatting_with_color}`}>{People[selectedUser]?.username}</span>
                            </div>

                        </div>



                        <div className="flex-grow overflow-auto">

                            {messagesWithoutDupe.map((message, index) => {
                                if (message.sender === selectedUser || message.recipient === selectedUser) {

                                    return (
                                        <div
                                            key={message._id}
                                            className={(message.sender == id ? 'text-right' : 'text-left')}
                                        >
                                            <div

                                                className={`p-2.5 m-0.5 max-w-[70%] rounded-[15px] inline-block font-medium ${message.sender === id ? lavenderTheme.sender_color : lavenderTheme.receiver_color
                                                    }`}
                                                key={index}
                                            >
                                                <div className="inline-block text-justify  font-sans sm:text-base md:text-lg break-words max-w-[100%]">
                                                    {message.text}


                                                    {message.file && (
                                                        <div className="">
                                                            <div className="underline text-center italic cursor-pointer">
                                                                <a target='_blank' href={axios.defaults.baseURL + 'uploads/' + message.file + '?t=' + Date.now()}>
                                                                    <img
                                                                        className='h-[100px] w-[100px] m-0 p-0  rounded-xl'
                                                                        src={getImageForFileType(message.file)}

/*                                                                         src={message.file.endsWith('.png') || message.file.endsWith('.jpg') || message.file.endsWith('.jpeg') ? image : file}
 */                                                                        alt='cannot show!!!'
                                                                    />
                                                                    {/*                                                                     <div className='text-[14px]'> {message.file} </div>
 */}                                                                </a>
                                                            </div>
                                                        </div>

                                                    )}
                                                    {!message.file && (
                                                        <div>
                                                            <div className="text-xs text-[#071b09] ">
                                                                {formatTimestamp(message.createdAt) ? '' : (/* message.day && */ message.time ? ` ${message.time}` : /* (message.day = getCurrentTimestamp().day) && */ (message.time = getCurrentTimestamp().time))}
                                                            </div>

                                                            <div className="text-xs text-[#071b09] ">
                                                                {formatTimestamp(message.createdAt)}
                                                            </div>
                                                        </div>
                                                    )}



                                                </div>

                                            </div>


                                        </div>
                                    );
                                }
                                return null;
                            })}
                            <div ref={divUnderMEssage}></div>
                        </div>

                        <form onSubmit={sendMessage} className="flex gap-2 mx-2">
                            <input
                                type="text"
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setnewMessage(e.target.value)}
                                name=""
                                id=""
                                className={`p-2 ${lavenderTheme.messagebox_border}  placeholder-black  m-3 border-2 flex-grow rounded-lg outline-none `}
                            />
                            <label className={` ${lavenderTheme.attach_color} cursor-pointer p-2 px-0.5 my-3 text-white rounded-lg`}>
                                <input type='file' className='hidden outline-none bg-transparent placeholder-slate-800' onChange={sendfile} />
                                <img className="h-7" src={attach} alt="Send" />
                            </label>
                            <button type='submit' className={`${lavenderTheme.sentbutton_color} p-2 px-1.5 m-3 mx-0 text-white rounded-lg`}>
                                <img className="h-7" src={sendbtn} alt="Sen" />
                            </button>
                        </form>
                    </div>

                }

            </div>
        </div >
    )
}

export default Chat
