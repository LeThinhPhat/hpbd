import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Background from "./Component/Background";
import Gift from "./Component/Gift";
import Question from "./Component/Question";
import "./index.css";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("isCorrect:", isCorrect, "showConfetti:", showConfetti);
  }, [isCorrect, showConfetti]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = answer.trim().toLowerCase();
    const correct = normalized === "bun bo" || normalized === "bún bò";
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        setShowConfetti(true);
      }, 500);
    } else {
      setShowConfetti(false);
    }
  };

  const balloons = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${100}%`,
  }));

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-yellow-100 to-pink-100 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center min-h-screen z-0">
        {!isOpen && <Gift onOpen={() => setIsOpen(true)} />}
        {isOpen && isCorrect === null && (
          <Question
            answer={answer}
            setAnswer={setAnswer}
            handleSubmit={handleSubmit}
            isCorrect={isCorrect}
          />
        )}
      </div>

      {isCorrect && showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center z-10 animate-fade-in">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={500}
            gravity={0.2}
            recycle={false}
          />
          <Background balloons={balloons} />
          <div className="absolute top-10 text-center z-20">
            <h1 className="text-3xl font-bold text-pink-600 drop-shadow-lg">
              🎉 Chúc Mừng Sinh Nhật Như Hiền 🎂
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
