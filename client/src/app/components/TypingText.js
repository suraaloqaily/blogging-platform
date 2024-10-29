import React, { useState, useEffect } from "react";

const TypingText = ({ text, speed = 50, name }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    if (index < text.length && !showFinalText) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    } else if (index >= text.length && !showFinalText) {
      setTimeout(() => {
        setDisplayedText(`Welcome, ${name} 💫🌍`); 
        setShowFinalText(true);
      }, 1000); 
    }
  }, [index, text, speed, showFinalText]);

  return (
    <h1 style={showFinalText ? styles.finalText : styles.typingText}>
      {displayedText}
    </h1>
  );
};

const styles = {
  typingText: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: "20px 0",
    textAlign: "center",
    background: "linear-gradient(90deg, #DEE6EBFF, #BDD0F9FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    animation: "blinking-cursor 0.8s steps(5, start) infinite",
  },
  finalText: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: "20px 0",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  "@keyframes blinking-cursor": {
    "50%": { opacity: 0 },
  },
};

export default TypingText;
