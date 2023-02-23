import React from 'react';

const Banner = ({ name, childStyles = '', parentStyles = '' }) => (
  <div className={`relative z-0 flex items-center w-full overflow-hidden nft-gradient ${parentStyles}`}>
    <p className={`text-5xl font-bold font-poppins leading-70 ${childStyles}`}>{name}</p>
    <div className="absolute w-48 h-48 rounded-full sm:w-32 sm:h-32 white-bg -top-9 -left-16 -z-5" />
    <div className="absolute rounded-full w-72 h-72 sm:w-56 sm:h-56 white-bg -bottom-24 -right-14 -z-5" />
  </div>
);

export default Banner;
