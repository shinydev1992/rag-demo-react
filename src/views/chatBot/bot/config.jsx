import { createChatBotMessage } from "react-chatbot-kit";


const botName = "HelpBot";

const config = {
  botName: botName,
  // Defines an array of initial messages that will be displayed on first render
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}`)
  ],
  customComponents: {
    // Replaces the default header
   // Replaces the default bot avatar
   botAvatar: (props) => <div className="avatar d-flex" style={{gap: '8px', background:'none'}}>
   <img
     class="avatar-img"
     src='https://poolwater-pro.com/wp-content/uploads/2024/05/bot.jpeg'
     alt="user@email.com"
     width={20}
     height={20}
   /><div className="align-self-end"><span style={{color: 'rgb(81 79 79)'}}>{botName}</span></div>
 </div>,
 userAvatar: 
 (props) => <div className="d-flex justify-content-end"><span style={{color: 'rgb(81 79 79)', fontSize: '1rem', textAlign:'center', fontWeight:500}}>You</span></div>,
   // Replaces the default bot chat message container

   userChatMessage: (props) => <div className="d-flex justify-content-end"><div class="react-chatbot-kit-user-chat-message">{props.message}</div></div>
   
 },
 
};

export default config;
