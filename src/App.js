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

  return (
    <div className="container">
      {isCorrect && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={[
            "#ffeb3b",
            "#ffeb3b",
            "#ff4081",
            "#00e676",
            "#3f51b5",
            "#e91e63",
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
          <div className="hpbd-text">
            Chúc Mừng Sinh Nhật Nguyễn Như Hiền 🎉🎂
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
          </div>
          <div className="bubble-container">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-2"></div>
            <div className="bubble bubble-3"></div>
            <div className="bubble bubble-4"></div>
            <div className="bubble bubble-5"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
