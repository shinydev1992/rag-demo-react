import React, { useState, useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import markdownit from "markdown-it";
import { isMobile } from "react-device-detect";
import TextareaAutosize from "react-textarea-autosize";
import { FaArrowCircleUp } from "react-icons/fa";

import "./styles.scss";

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
});

const ChatBot2 = (props) => {
  const { handleClose, location } = props;
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! Please ask me any questions you may have regarding our PoolWater-Pro software, or if there's any pool issues you need help with.",
      timestamp: moment().format("hh:mm")
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [allContent, setAllContent] = useState("");
  const messagesEndRef = useRef(null);
  const scrollbarsRef = useRef(null);
  const sseRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  const sendQuestion = () => {
    if (input.trim() === "" || isLoading) return;

    setIsChat(true);
    setIsLoading(true);

    const newMessage = {
      type: "user",
      text: input,
      timestamp: moment().format("hh:mm")
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    scrollToBottom();
  };

  // const getChatHistory = () => {
  //   let result = "Here is chat history:\n------ start -------";
  //   let _messages = messages.slice();
  //   _messages.forEach((msg) => {
  //     result += msg.type + ": " +  msg.text + "\n";
  //   });
  //   result += "------ end --------"
  //   return result;
  // };

  useEffect(() => {
    if (!isChat) return;
    const systemPrompt = `Here is User's information:\n${location}\n`;

    // let chatHistory = getChatHistory();

    sseRef.current = new EventSource(
      `https://chatbot.poolwater-pro.com/api/langchain/chat?prefix=${systemPrompt}&message=${input}&is_app=no`,
      { withCredentials: true }
    );

    setInput("");

    sseRef.current.onmessage = (event) => {
      if (event.data) {
        setAllContent((prevContent) => {
          const updatedContent =
            prevContent +
            event.data.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
          setIsLoading(false);
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage.type === "user") {
              return [
                ...prevMessages,
                {
                  type: "bot",
                  text: updatedContent,
                  timestamp: moment().format("hh:mm")
                }
              ];
            } else if (lastMessage.type === "bot") {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1].text = updatedContent;
              return updatedMessages;
            }
            return prevMessages;
          });
          return updatedContent;
        });
      }
    };

    sseRef.current.onerror = () => {
      sseRef.current.close();
      setIsChat(false);
      setIsLoading(false);
      setAllContent("");
    };

    return () => {
      sseRef.current.close();
    };
  }, [isChat]);

  const handleKeyDown = (e) => {
    if (!isMobile) {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        setInput(input + "\n");
      } else if (e.key === "Enter") {
        e.preventDefault();
        sendQuestion();
      }
    }
  };

  return (
    <section className="avenue-messenger">
      <div className="menu">
        <div className="close-popup-icon" onClick={handleClose}></div>
      </div>
      <div className="agent-face">
        <div className="half">
          <img
            className="agent circle"
            src="https://poolwater-pro.com/wp-content/uploads/2024/05/bot-e1716661303394.jpeg"
            alt="Jesse Tino"
          />
        </div>
      </div>
      <div
        className="chat"
        style={{
          height: isMobile ? "calc( 100% - 33px )" : "calc( 100% - 15px )"
        }}
      >
        <div className="chat-title">
          <span>HelpBot</span>
        </div>
        <div className="messages">
          <Scrollbars
            ref={scrollbarsRef}
            className="messages-content"
            onScroll={(e) => {
              e.stopPropagation();
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === "user" ? "message-personal" : "new"
                }`}
              >
                {msg.type === "bot" && (
                  <figure className="avatar">
                    <img
                      src="https://poolwater-pro.com/wp-content/uploads/2024/05/bot-e1716661303394.jpeg"
                      alt="Bot Avatar"
                    />
                  </figure>
                )}
                <div
                  className="message-box-content"
                  dangerouslySetInnerHTML={{ __html: md.render(msg.text) }}
                />
                {msg.type === "bot" && (
                  <>
                    <div className="timestamp">{msg.timestamp}</div>
                    <div className="checkmark-sent-delivered">✓</div>
                    <div className="checkmark-read">✓</div>
                  </>
                )}
              </div>
            ))}
            {isChat && isLoading && (
              <div className="message new">
                <figure className="avatar">
                  <img
                    src="https://poolwater-pro.com/wp-content/uploads/2024/05/bot-e1716661303394.jpeg"
                    alt="Bot Avatar"
                  />
                </figure>
                <SyncLoader
                  size={6}
                  color="grey"
                  loading={isLoading}
                  speedMultiplier={0.7}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </Scrollbars>
        </div>
        <div className="message-box">
          <TextareaAutosize
            className="message-input"
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxRows={10}
          />
          <button
            type="submit"
            className="message-submit"
            onClick={sendQuestion}
            disabled={isLoading}
          >
            <FaArrowCircleUp size={28} color="black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatBot2;
