/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import config from "./bot/config";
import MessageParser from "./bot/MessageParser";
import ActionProvider from "./bot/ActionProvider";
import ChatbotKit from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./index.scss";

const ChatBot = ({theme}) => {

  const ChatbotHeader = () => (
    <div className="d-flex align-items-center gap-1">
      <div class="avatar">
        <img
          class="avatar-img"
          src="https://poolwater-pro.com/wp-content/uploads/2024/05/bot.jpeg"
          alt="user@email.com"
          width={64}
          height={64}
        />
        <span class="avatar-status-online bg-success"></span>
      </div>
      <div className="text-start align-self-center">
        <p className="fs-2" style={{ marginBottom: "1rem", marginTop: "1rem" }}>
          HelpBot
        </p>
        <p style={{ marginBottom: 0, color: "grey" }}>online</p>
      </div>
    </div>
  );

  const darkmode = theme?.palette?.mode;
  const themeColor = theme?.status?.themeColor;

  return (
    <div
      className={"rcw-conversation-container " + darkmode}
      style={{ bottom: "80px", right: "16px", backgroundColor: themeColor }}
    >
    <ChatbotKit
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
      headerText={<ChatbotHeader />}
      placeholderText="Type your message here."
    />
    </div>
  );
};
ChatBot.propTypes = {
  handleAction: PropTypes.func.isRequired
};
export default ChatBot;
