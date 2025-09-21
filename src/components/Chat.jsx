import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "../styles/Chat.css";
  

const Chat = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      uid: auth.currentUser.uid,   // ✅ Add this
      room,
    });

    setNewMessage("");
  };
  return (
    <div className="">
      <div className="bg-success text-white">
        <h1 className="p-2"><i class="bi bi-person-square"></i> {room.toUpperCase()}</h1>
      </div>

      <div className="messages">
  {messages.map((message) => (
    <div
      key={message.id}
      className={`message ${
        message.uid === auth.currentUser.uid ? "my-message" : "other-message"
      }`}
    >
      <span className="user">{message.user}:</span> {message.text}
    </div>
  ))}
</div>


      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="form-control"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-butto btn">
          <i class="bi bi-send-fill text-success"></i>
        </button>
      </form>
    </div>
  );
}

export default Chat