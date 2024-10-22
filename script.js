import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  remove,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBrs6yvXJG8qn1mel8EH2_mj_czWI7lqK0",
  authDomain: "webychatroom.firebaseapp.com",
  projectId: "webychatroom",
  storageBucket: "webychatroom.appspot.com",
  messagingSenderId: "720903024738",
  appId: "1:720903024738:web:0d5205b0e7228c6ff9613b",
  measurementId: "G-GQFRX0Y3K0",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");
const clearChatButton = document.getElementById("clearChat");
const messagesContainer = document.getElementById("messagesContainer");
let passcode = null;
let username = "";

document.addEventListener("DOMContentLoaded", () => {
  const passcodeModal = document.getElementById("passcodeModal");
  const modalPasscodeInput = document.getElementById("modalPasscodeInput");
  const modalNameInput = document.getElementById("modalNameInput");
  const submitPasscodeButton = document.getElementById("submitPasscode");
  passcodeModal.style.display = "block";
  submitPasscodeButton.addEventListener("click", () => {
    passcode = modalPasscodeInput.value.trim();
    username = modalNameInput.value.trim();

    if (passcode === "" || username === "") {
      alert("Please enter a valid passcode/Username. ");
      return;
    }

    passcodeModal.style.display = "none";
    document.getElementById("chat_container").style.display = "block";
    loadMessages();
  });
});

console.log(passcode);

sendMessageButton.addEventListener("click", () => {
  const message = messageInput.value;

  if (message) {
    sendMessage(message);
    messageInput.value = "";
  }
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessageButton.click();
  }
});

const sendMessage = (message) => {
  const messageData = {
    message: `${username}: ${message}`,
  };

  push(ref(database, `messages/${passcode}`), messageData);
};

const loadMessages = () => {
  const messagesRef = ref(database, `messages/${passcode}`);
  onChildAdded(messagesRef, (data) => {
    const messageData = data.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerText = messageData.message;
    messageElement.style.color = getRandomColor();
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
};

const clearChat = async () => {
  const messagesRef = ref(database, `messages/${passcode}`);
  await remove(messagesRef);
  messagesContainer.innerHTML = "";
};

clearChatButton.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear the chat?");
  if (confirmation) {
    clearChat();
  }
});

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
function moveBox(box) {
  const randomX = Math.random() * (window.innerWidth - 500);
  const randomY = Math.random() * (window.innerHeight - 1000);
  const randomRotation = Math.random() * 180;
  box.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
  setTimeout(() => {
    moveBox(box);
  }, 5000);
}
boxes.forEach((box) => {
  moveBox(box);
});
