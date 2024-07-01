import React from "react";
import { useState, useEffect } from "react";
import LaunchChatButton from "./views/LaunchChatButton";
import ChatBot2 from "./views/chatbot2";

// ** Styles
import "./widgetSetting.scss";

export default function ChatWidget({ theme, location }) {
  const [open, setOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollEnd = documentHeight - windowHeight - 448;

      if (scrollTop >= 192 && scrollTop < scrollEnd) {
        setOpacity(1);
      } else if (scrollTop >= scrollEnd) {
        setOpacity(0);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="rcw-poolmanager-overlap"
        style={{ display: open ? "block" : "none" }}
        onClick={handleClose}
      ></div>
      <div
        className="rcw-poolmanager"
        style={{
          opacity,
          transition: "opacity 0.5s ease-in-out"
        }}
      >
        <div style={{width: 300, height: 10002, background: 'black'}}></div>
        <LaunchChatButton theme={theme} open={open} setOpen={setOpen} />
        </div>
      {open && <ChatBot2 handleClose={handleClose} location={location}/>}
    </>
  );
}
