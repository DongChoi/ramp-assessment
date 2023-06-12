import React, { useEffect, useState } from "react";

function TypeWriterComponent({ flag }) {
  const [animatedText, setAnimatedText] = useState("");
  useEffect(() => {
    let currentIndex = animatedText.length;
    const typeNextLetter = () => {
      if (currentIndex < flag.length) {
        setAnimatedText((prevText) => prevText + flag[currentIndex]);
      }
    };

    const intervalId = setInterval(typeNextLetter, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [animatedText]);

  return <div>{animatedText}</div>;
}

export default TypeWriterComponent;
