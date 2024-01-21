import React from 'react';
import arrow from './assets/arrow.png';
const Start = () => {
  const textStyle = {
    fontFamily: "'Qwigley', cursive",
  };
  const textStyle2 = {
    fontFamily: "'Major Mono Display', monospace",
  };
  const startchat = {
    fontFamily: "'Amatic SC', sans-serif",
  }
  return (
    <div className='bg-[#364954] border-l-2 border-[#d9cce2] h-screen flex flex-col items-center justify-center'>
      <div style={textStyle2} className="text-[#d9cce2] text-6xl mb-5"> KASHITOKARU</div>
      <div className="text-[#13090a] text-4xl text-center " style={textStyle}>
        The Art of Conversation, Redefined...
      </div>
      <div className="text-[60px] flex flex-row flicker text-[#d9cce2] " style={startchat}>
        <img className='h-[60px]  mt-[18px] ' src={arrow}></img>
        <div className="ml-4">start a chat</div></div>
    </div>
  );
};

export default Start;
