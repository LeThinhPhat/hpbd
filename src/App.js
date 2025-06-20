import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      answer.trim().toLowerCase() === "bun bo" ||
      answer.trim().toLowerCase() === "bún bò"
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Generate 100 balloons with random positions across the entire screen
  const balloons = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${100}%`, // Start from the bottom
  }));

  useEffect(() => {
    if (isCorrect) {
      const confettiTimer = setTimeout(() => setShowConfetti(true), 4000); // Balloons pop after 4s
      return () => clearTimeout(confettiTimer);
    }
  }, [isCorrect]);

  return (
    <div className="container">
      {isCorrect && showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.1}
          colors={[
            "#ffeb3b",
            "#ff4081",
            "#00e676",
            "#3f51b5",
            "#e91e63",
            "#ff69b4",
            "#ff1493",
          ]}
        />
      )}
      {!isOpen && (
        <div
          className={`gift-box ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(true)}
          role="button"
          aria-label="Mở hộp quà"
        >
          <div className="gift-lid"></div>
          <div className="ribbon ribbon-vertical"></div>
          <div className="ribbon ribbon-horizontal"></div>
        </div>
      )}
      {isOpen && !isCorrect && (
        <div className="question-container">
          <p className="question-text">Món ăn yêu thích nhất của bạn là gì?</p>
          <form className="question-form" onSubmit={handleSubmit}>
            <label htmlFor="answer" className="sr-only">
              Câu trả lời
            </label>
            <input
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Nhập món ăn"
              className="question-input"
              aria-describedby="answer-error"
            />
            <button type="submit" className="question-button">
              Gửi
            </button>
            {isCorrect === false && (
              <p id="answer-error" className="error-text">
                Thử lại nhé!
              </p>
            )}
          </form>
        </div>
      )}
      {isCorrect && (
        <>
          <div className="hpbd-text">Chúc Mừng Sinh Nhật Như Hiền 🎉🎂</div>
          <div className="pet-container">
            {balloons.map((balloon) => (
              <div
                key={balloon.id}
                className="balloon"
                style={{ left: balloon.left, top: balloon.top }}
              ></div>
            ))}
            {balloons.map((balloon) => (
              <div
                key={`${balloon.id}-image`}
                className="balloon-image"
                style={{ left: balloon.left, top: balloon.top }}
              >
                <img
                  src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meo-bua-50.jpg"
                  alt="Bouncing Cat"
                  className="pet-image"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiPxcxq-GNmq67_M2bmGu1O9yflXwypbNQ2EL2K23NPD6kvj3ebHxubO76CgLPjTM7KLo&usqp=CAU"
                  alt="Bouncing Cat"
                  className="pet-image"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
