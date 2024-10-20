// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  remove,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// script.js
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrs6yvXJG8qn1mel8EH2_mj_czWI7lqK0",
  authDomain: "webychatroom.firebaseapp.com",
  projectId: "webychatroom",
  storageBucket: "webychatroom.appspot.com",
  messagingSenderId: "720903024738",
  appId: "1:720903024738:web:0d5205b0e7228c6ff9613b",
  measurementId: "G-GQFRX0Y3K0",
}; // Import the functions you need from the SDKs you need
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");
const clearChatButton = document.getElementById("clearChat"); // Get clear chat button
const messagesContainer = document.getElementById("messagesContainer");

// Listen for the send button click
sendMessageButton.addEventListener("click", () => {
  const message = messageInput.value;

  if (message) {
    sendMessage(message);
    messageInput.value = ""; // Clear input
  }
});

// Function to send a message
const sendMessage = (message) => {
  const messageData = {
    message: message,
    timestamp: Date.now(), // Timestamp for sorting
  };

  // Push message data to the database
  push(ref(database, "messages"), messageData);
};

// Function to load messages
const loadMessages = () => {
  const messagesRef = ref(database, "messages");
  onChildAdded(messagesRef, (data) => {
    const messageData = data.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerText = messageData.message;
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
};

// Function to clear chat
const clearChat = async () => {
  const messagesRef = ref(database, "messages");
  await remove(messagesRef); // Remove all messages from the database
  messagesContainer.innerHTML = ""; // Clear the messages in the chat UI
};

// Add event listener for the clear chat button
clearChatButton.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear the chat?");
  if (confirmation) {
    clearChat();
  }
});

// Load messages on startup
loadMessages();
