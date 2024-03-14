import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

const list = ["All", "Live", "Gaming","All", "Live", "Gaming","All", "Live", "Gaming","All", "Live", "Gaming"];

const ButtonList = () => {
  const isMobileView = window.innerWidth < 768; // Adjust the breakpoint as needed
  const buttonContainerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (buttonContainerRef.current) {
        setScrollLeft(buttonContainerRef.current.scrollLeft);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = (scrollOffset) => {
    if (buttonContainerRef.current) {
      buttonContainerRef.current.scrollLeft += scrollOffset;
      setScrollLeft(buttonContainerRef.current.scrollLeft);
    }
  };

  return (
    <div ref={buttonContainerRef} className="flex overflow-x-auto">
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
      {isMobileView && buttonContainerRef.current && (
        <>
          {scrollLeft > 0 && (
            <button className="carousel-button left" onClick={() => handleScroll(-100)}>
              &lt;
            </button>
          )}
          {scrollLeft < buttonContainerRef.current.scrollWidth - buttonContainerRef.current.clientWidth && (
            <button className="carousel-button right" onClick={() => handleScroll(100)}>
              &gt;
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ButtonList;
