import React, { useState } from 'react';
import styles from './Chatbot.module.css';
import { FiMessageSquare, FiX, FiSend, FiMic } from 'react-icons/fi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.botInfo}>
              <div className={styles.botAvatar}>
                <FiMessageSquare />
              </div>
              <div>
                <div className={styles.botName}>FreshBot</div>
                <div className={styles.botStatus}>Online</div>
              </div>
            </div>
            <button onClick={toggleChat} className={styles.closeBtn}>
              <FiX />
            </button>
          </div>
          <div className={styles.chatBody}>
            <div className={styles.botMessage}>
                <div className={styles.botAvatarSmall}><FiMessageSquare /></div>
                <p>Hi! I'm FreshBot. How can I help you find the best produce today?</p>
            </div>
          </div>
          <div className={styles.chatFooter}>
            <FiMic className={styles.micIcon} />
            <input type="text" placeholder="Type your message..." />
            <button className={styles.sendBtn}>
              <FiSend />
            </button>
          </div>
        </div>
      )}
      <button onClick={toggleChat} className={styles.chatButton}>
        {isOpen ? <FiX /> : <FiMessageSquare />}
      </button>
    </div>
  );
};

export default Chatbot;
