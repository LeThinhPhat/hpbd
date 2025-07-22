import React from "react";

const Background = ({ balloons }) => {
  // Expanded array of modern gradient colors with richer tones
  const balloonColors = [
    "from-rose-500 to-fuchsia-600",
    "from-sky-400 to-indigo-500",
    "from-amber-400 to-red-500",
    "from-emerald-400 to-teal-600",
    "from-violet-500 to-purple-600",
  ];

  // Confetti colors for particle effect
  const confettiColors = [
    "bg-yellow-300",
    "bg-pink-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-purple-300",
  ];

  // Generate random size for balloons (20px to 40px) and confetti (4px to 8px)
  const getRandomBalloonSize = () =>
    Math.floor(Math.random() * (40 - 20 + 1)) + 20;
  const getRandomConfettiSize = () =>
    Math.floor(Math.random() * (8 - 4 + 1)) + 4;

  // Generate random animation duration and delay
  const durations = [
    "duration-2000",
    "duration-3000",
    "duration-4000",
    "duration-5000",
  ];
  const delays = ["delay-0", "delay-200", "delay-500", "delay-1000"];
  const getRandomDuration = () =>
    durations[Math.floor(Math.random() * durations.length)];
  const getRandomDelay = () =>
    delays[Math.floor(Math.random() * delays.length)];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Balloons */}
      {balloons.map((balloon) => {
        const size = getRandomBalloonSize();
        const color =
          balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const shapeClass =
          Math.random() > 0.5 ? "rounded-full" : "rounded-[40%]";

        return (
          <div
            key={balloon.id}
            className={`
              absolute bg-gradient-to-br ${color}
              ${shapeClass} shadow-xl shadow-${
              color.split(" ")[0].split("-")[1]
            }-600/40
              animate-float hover:scale-125 transition-transform ease-in-out
              ${getRandomDuration()} ${getRandomDelay()}
            `}
            style={{
              left: balloon.left,
              top: balloon.top,
              width: `${size}px`,
              height: `${size * 1.4}px`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-30 blur-md" />
            {/* Sparkle effect */}
            <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-2 opacity-60 animate-pulse" />
            {/* Balloon string with slight curve */}
            <div
              className="absolute w-0.5 h-12 bg-gradient-to-b from-gray-300/70 to-transparent"
              style={{
                left: "50%",
                top: "100%",
                transform: `translateX(-50%) rotate(${
                  Math.random() * 10 - 5
                }deg)`,
              }}
            />
          </div>
        );
      })}
      {/* Confetti particles */}
      {Array.from({ length: 20 }).map((_, index) => {
        const size = getRandomConfettiSize();
        const confettiColor =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];
        return (
          <div
            key={`confetti-${index}`}
            className={`
              absolute ${confettiColor} rounded-sm
              animate-fall ${getRandomDuration()} ${getRandomDelay()}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(var(--tw-rotate));
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) rotate(calc(var(--tw-rotate) + 5deg));
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(var(--tw-rotate));
            opacity: 0.8;
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Background;
