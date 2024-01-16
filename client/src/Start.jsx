/* import React from 'react';
import w1 from './assets/w6.jpg';
import arrowc from './assets/arrowc.png';
const Start = () => {


  const textStyle = {
    fontFamily: "'Qwigley', cursive",
  };
  const textStyle2 = {
   fontFamily:"'Major Mono Display', monospace",
  };
  const startchat={
    fontFamily: "'Amatic SC', sans-serif",

  }
  return (
    <div   style={{
      backgroundImage: `url(${w1})`, backgroundSize: 'cover', filter: 'blur(0px)'
      , opacity: '1',
  }}
     className='bg-cyan-500 border-l-2 border-[#a85a5a] h-screen flex flex-col items-center justify-center'>
      <div style={textStyle2} className="text-[#a85a5a] text-6xl mb-5"> KASHITOKARU</div>
      <div className="text-[#13090a] text-4xl text-center " style={textStyle}>
        The Art of Conversation, Redefined...
      </div>
      <div className="text-[60px] flex flex-row flicker text-[#378370] " style={startchat}>
        <img className='h-[60px] rotate-180 mt-[18px] ' src={arrowc}></img>
        <div className="ml-4">start a chat</div></div>
    </div>
  );
};

export default Start;
 */
import React from 'react';
import w1 from './assets/w6.jpg';
import arrowc from './assets/arrowc.png';
const Start = () => {


  const textStyle = {
    fontFamily: "'Qwigley', cursive",
  };
  const textStyle2 = {
   fontFamily:"'Major Mono Display', monospace",
  };
  const startchat={
    fontFamily: "'Amatic SC', sans-serif",

  }
  return (
    <div   style={{
    
  }}
     className='bg-[#4F3268] border-l-2 border-[#d9cce2] h-screen flex flex-col items-center justify-center'>
      <div style={textStyle2} className="text-[#d9cce2] text-6xl mb-5"> KASHITOKARU</div>
      <div className="text-[#13090a] text-4xl text-center " style={textStyle}>
        The Art of Conversation, Redefined...
      </div>
      <div className="text-[60px] flex flex-row flicker text-[#d9cce2] " style={startchat}>
        <img className='h-[60px] rotate-180 mt-[18px] ' src={arrowc}></img>
        <div className="ml-4">start a chat</div></div>
    </div>
  );
};

export default Start;
