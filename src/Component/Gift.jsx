import React, { useState } from "react";

const Gift = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    if (onOpen) {
      setTimeout(() => {
        onOpen();
        setIsOpening(false);
      }, 1000);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition-transform duration-300 ${
        isOpening ? "animate-openGift" : "hover:scale-105"
      } w-56 h-56 flex items-center justify-center`}
    >
      <div className="relative w-44 h-44 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-2xl">
        {/* Gift box sides with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg transform -translate-y-3 z-10 border-2 border-blue-900"></div>
        {/* Red ribbon base */}
        <div className="absolute w-10 h-full bg-gradient-to-b from-red-600 to-red-800 left-1/2 -translate-x-1/2 shadow-inner"></div>
        {/* Orange ribbon overlay */}
        <div className="absolute w-12 h-full bg-gradient-to-b from-orange-500 to-orange-700 left-1/2 -translate-x-1/2 opacity-80"></div>
        {/* Horizontal ribbon */}
        <div className="absolute w-full h-8 bg-gradient-to-r from-orange-500 to-red-600 top-1/2 -translate-y-1/2 shadow-inner"></div>
        {/* Bow with detailed loops */}
        <div className="absolute w-20 h-20 bg-gradient-to-br from-orange-500 to-red-700 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex items-center justify-center animate-bowPulse shadow-lg">
          {/* Bow loops */}
          <div className="absolute w-16 h-16 bg-gradient-to-br from-red-600 to-orange-700 rounded-full -left-4 transform -rotate-45"></div>
          <div className="absolute w-16 h-16 bg-gradient-to-br from-red-600 to-orange-700 rounded-full -right-4 transform rotate-45"></div>
          {/* Bow center knot */}
          <div className="absolute w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full z-20"></div>
        </div>
        {/* Decorative sparkles */}
        <div className="absolute w-3 h-3 bg-orange-300 rounded-full top-4 left-4 opacity-60 animate-pulse"></div>
        <div className="absolute w-2 h-2 bg-red-200 rounded-full bottom-6 right-6 opacity-60 animate-pulse"></div>
      </div>
      <style jsx>{`
        @keyframes openGift {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotate(5deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
          }
        }

        .animate-openGift {
          animation: openGift 1s ease-in-out forwards;
        }

        @keyframes bowPulse {
          0%,
          100% {
            transform: scale(1) translate(-50%, -100%);
          }
          50% {
            transform: scale(1.05) translate(-50%, -100%);
          }
        }

        .animate-bowPulse {
          animation: bowPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Gift;
