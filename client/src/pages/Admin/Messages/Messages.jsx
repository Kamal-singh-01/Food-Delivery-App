import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axios from "../../../api/axios";
import "./Messages.css";

const Messages = () => {
  const { token } = useContext(StoreContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get("/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark as read
  const handleMarkAsRead = async (id) => {
    try {
      const response = await axios.put(
        `/contact/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setMessages(
          messages.map((msg) =>
            msg._id === id ? { ...msg, isRead: true } : msg,
          ),
        );
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      const response = await axios.delete(`/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMessages(messages.filter((msg) => msg._id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  if (loading) return <p className="loading">Loading messages...</p>;

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="messages">
      <h2>Customer Messages</h2>
      <p className="messages-count">
        Total: {messages.length} messages
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} unread</span>
        )}
      </p>

      {messages.length === 0 ? (
        <p className="no-messages">No messages yet!</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            className={`message-card ${msg.isRead ? "read" : "unread"}`}
          >
            {/* Status dot */}
            <div className="message-status">
              <span className={`dot ${msg.isRead ? "read" : "unread"}`}></span>
            </div>

            {/* Message Info */}
            <div className="message-info">
              <div className="message-header">
                <h3>{msg.name}</h3>
                <span className="message-email">{msg.email}</span>
                <span className="message-time">
                  {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="message-subject">
                <b>Subject:</b> {msg.subject}
              </p>
              <p className="message-text">{msg.message}</p>
            </div>

            {/* Actions */}
            <div className="message-actions">
              {!msg.isRead && (
                <button
                  className="read-btn"
                  onClick={() => handleMarkAsRead(msg._id)}
                >
                  ✅ Mark as Read
                </button>
              )}
              <button
                className="delete-btn"
                onClick={() => handleDelete(msg._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
