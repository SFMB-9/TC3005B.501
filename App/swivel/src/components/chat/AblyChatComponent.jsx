import React, { useEffect, useState } from "react";
import { useChannel } from "./AblyReactEffect";
import styles from "./AblyChatComponent.module.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import Ably from "ably/promises";
import { set } from "mongoose";

const AblyChatComponent = () => {
  const { data: session } = useSession();
  let inputBox = null;
  let messageEnd = null;
  let channel_name = "id1-id2";

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  useEffect(() => {
    // Function to fetch messages from MongoDB
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("/api/chat/getMessages", {
          params: {
            channel: channel_name,
          },
        });

        const formated_msg = data.map((msg) =>
          Ably.Realtime.Message.fromEncoded({
            name: "chat-message",
            data: msg.content,
            clientId: msg.sender,
            timestamp: msg.timestamp,
          })
        );
        setMessages(formated_msg);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [session, channel_name]);

  const [channel, ably] = useChannel(channel_name, (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = async (messageText) => {
    channel.publish({ name: "chat-message", data: messageText });

    try {
      const { data } = await axios.post("/api/chat/postMessage", {
        content: messageText,
        sender: session.id,
        timestamp: Date.now(),
        channel: channel_name,
      });
      console.log(data);
    } catch (error) {
      console.error("Error saving message:", error);
    }

    setMessageText("");
    if (inputBox) {
      inputBox.focus();
    }
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author =
      message.clientId === session.id || message.connectionId === ably.connection.id
        ? "me"
        : "other";

    const date = new Date(message.timestamp);
    const formattedDate = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return (
        <span key={index} className={styles.message} data-author={author}>
          {message.data}
          <span className={styles.timestamp}>{formattedDate}</span>
        </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    session && (
      <div className={styles.chatHolder}>
        <div className={styles.chatText}>
          {messages}
          <div
            ref={(element) => {
              messageEnd = element;
            }}
          ></div>
        </div>
        <form onSubmit={handleFormSubmission} className={styles.form}>
          <textarea
            ref={(element) => {
              inputBox = element;
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.textarea}
          ></textarea>
          <button
            type="submit"
            className={styles.button}
            disabled={messageTextIsEmpty}
          >
            Send
          </button>
        </form>
      </div>
    )
  );
};

export default AblyChatComponent;
