// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  remove,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrs6yvXJG8qn1mel8EH2_mj_czWI7lqK0",
  authDomain: "webychatroom.firebaseapp.com",
  projectId: "webychatroom",
  storageBucket: "webychatroom.appspot.com",
  messagingSenderId: "720903024738",
  appId: "1:720903024738:web:0d5205b0e7228c6ff9613b",
  measurementId: "G-GQFRX0Y3K0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");
const clearChatButton = document.getElementById("clearChat");
const messagesContainer = document.getElementById("messagesContainer");

let passcode = "";

// Prompt user for passcode on page load
document.addEventListener("DOMContentLoaded", () => {
  const passcodeModal = document.getElementById("passcodeModal");
  const modalPasscodeInput = document.getElementById("modalPasscodeInput");
  const submitPasscodeButton = document.getElementById("submitPasscode");
  let passcode = "";

  // Show the modal when the page loads
  passcodeModal.style.display = "block";

  // Handle the passcode submission
  submitPasscodeButton.addEventListener("click", () => {
    passcode = modalPasscodeInput.value.trim();

    if (passcode === "") {
      alert("Please enter a valid passcode.");
      return;
    }

    // Hide the modal after valid input
    passcodeModal.style.display = "none";
    document.getElementById("chat_container").style.display = "block";

    // Now load the messages for the given passcode
    loadMessages(passcode);
  });
});

// Rest of the script.js logic

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

  // Push message data to the database under the passcode
  push(ref(database, `messages/${passcode}`), messageData);
};

// Function to load messages based on the passcode
const loadMessages = () => {
  const messagesRef = ref(database, `messages/${passcode}`);
  onChildAdded(messagesRef, (data) => {
    const messageData = data.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerText = messageData.message;
    messageElement.style.color = getRandomColor();
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
};

// Function to clear chat based on the passcode
const clearChat = async () => {
  const messagesRef = ref(database, `messages/${passcode}`);
  await remove(messagesRef); // Remove all messages from the database for this passcode
  messagesContainer.innerHTML = ""; // Clear the messages in the chat UI
};

// Add event listener for the clear chat button
clearChatButton.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear the chat?");
  if (confirmation) {
    clearChat();
  }
});

// Function to get a random color for message styling
function getRandomColor() {
  const colors = [
    "#fbf8cc",
    "#fde4cf",
    "#ffcfd2",
    "#f1c0e8",
    "#cfbaf0",
    "#a3c4f3",
    "#90dbf4",
    "#8eecf5",
    "#98f5e1",
    "#b9fbc0",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
const boxes = document.querySelectorAll(".box");

// Function to move a box to a random position
function moveBox(box) {
  const randomX = Math.random() * (window.innerWidth - 500); // Random X position
  const randomY = Math.random() * (window.innerHeight - 1000); // Random Y position
  const randomRotation = Math.random() * 180;
  box.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`; // Move to the new position
  // Recursively move the box after a random delay
  setTimeout(() => {
    moveBox(box);
  }, 5000);
}

// Start moving each box
boxes.forEach((box) => {
  moveBox(box); // Start moving the box immediately
});
