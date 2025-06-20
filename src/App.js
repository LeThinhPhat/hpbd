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
  const [showImage, setShowImage] = useState(false);
  const [showHeartLeaves, setShowHeartLeaves] = useState(false);
  const [showFormedHeart, setShowFormedHeart] = useState(false);

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

  // Generate 100 balloons with random positions
  const balloons = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 50 + 50}%`,
  }));

  // Generate 100 heart leaves with random initial positions
  const heartLeaves = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    left: `${50 + Math.random() * 20 - 10}%`, // Centered with some random spread
    top: `${60 + Math.random() * 20}%`, // Start from middle of screen
    delay: Math.random() * 2, // Random delay for wind effect
    color: `hsl(${Math.random() * 360}, 70%, 70%)`, // Random colorful hues
  }));

  useEffect(() => {
    if (isCorrect) {
      const confettiTimer = setTimeout(() => setShowConfetti(true), 2000); // Balloons pop after 2s
      const imageTimer = setTimeout(() => setShowImage(true), 4000); // Image appears after 4s
      const heartLeavesTimer = setTimeout(() => setShowHeartLeaves(true), 6000); // Leaves blow away after 6s
      const formedHeartTimer = setTimeout(() => setShowFormedHeart(true), 9000); // Heart forms after 9s
      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(imageTimer);
        clearTimeout(heartLeavesTimer);
        clearTimeout(formedHeartTimer);
      };
    }
  }, [isCorrect]);

  return (
    <div className="container">
      {isCorrect && showConfetti && (
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
            {balloons.map((balloon) => (
              <div
                key={balloon.id}
                className="balloon"
                style={{ left: balloon.left, top: balloon.top }}
              ></div>
            ))}
            {showImage &&
              balloons.map((balloon) => (
                <div
                  key={`${balloon.id}-image`}
                  className="balloon-image"
                  style={{ left: balloon.left, top: balloon.top }}
                >
                  <img
                    src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-cho-26.jpg"
                    alt="Bouncing Dog"
                    className="pet-image"
                  />
                </div>
              ))}
            {showHeartLeaves &&
              heartLeaves.map((leaf) => (
                <div
                  key={leaf.id}
                  className="heart-leaf"
                  style={{
                    left: leaf.left,
                    top: leaf.top,
                    backgroundColor: leaf.color,
                    animationDelay: `${leaf.delay}s`,
                  }}
                ></div>
              ))}
            {showFormedHeart && <div className="formed-heart"></div>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
