import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [showText, setShowText] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container">
      {showText && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          colors={["#ffeb3b", "#ff4081", "#00e676", "#3f51b5", "#e91e63"]}
        />
      )}
      <div className="heart" onClick={() => setShowText(true)}>
        <div className="sparkle"></div>
      </div>
      {showText && (
        <>
          <div className="hpbd-text">
            Chúc Mừng Sinh Nhật Minh Như{" "}
            <span className="date-highlight">20/6</span> 🎉🎂
          </div>
          <div className="pet-container">
            <img
              src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-cho-26.jpg"
              alt="Bouncing Dog"
              className="pet-image"
            />
            <img
              src="https://i.pinimg.com/736x/b1/8a/c5/b18ac5e4327e9f4c166295e7444db884.jpg"
              alt="Bouncing Cat"
              className="pet-image"
            />
            <img
              src="data:image/jpeg;base64,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"
              alt="Bouncing Puppy"
              className="pet-image"
            />
          </div>
          <div className="balloon-container">
            <div className="balloon balloon-1"></div>
            <div className="balloon balloon-2"></div>
            <div className="balloon balloon-3"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
