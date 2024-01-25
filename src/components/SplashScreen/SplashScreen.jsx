import React, { useEffect, useRef } from "react";
import Login from "../Login/Login";
import "./SplashScreen.less";

const SplashScreen = ({ setIsUserLoggedIn }) => {
  const splashScreenRef = useRef(null);

  useEffect(() => {
    const splashScreenElement = splashScreenRef.current;
    const handleAnimationEnd = () => {
      splashScreenElement.style.display = "none";
    };

    setTimeout(() => {
      splashScreenElement.addEventListener("animationend", handleAnimationEnd);
    }, 2700);

    return () => {
      splashScreenElement.removeEventListener(
        "animationend",
        handleAnimationEnd
      );
    };
  }, []);

  return (
    <>
      <div className="splash-screen" ref={splashScreenRef}>
        <div className="word-wrapper">
          <div className="upper">
            <span className="text">N</span>
            <span className="text">U</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text">S</span>
            <span className="text">P</span>
            <span className="text">O</span>
            <span className="text">R</span>
            <span className="text">T</span>
          </div>
          <div className="lower">
            <span className="text">M</span>
            <span className="text">A</span>
            <span className="text">P</span>
          </div>
        </div>
      </div>
      <Login setIsUserLoggedIn={setIsUserLoggedIn} />
    </>
  );
};

export default SplashScreen;
