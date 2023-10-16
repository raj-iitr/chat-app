<template>
  <div v-if="isUser">
    Name :
    <input
      type="text"
      placeholder="Please enter your name"
      id="userName"
    /><br />
    <button @click="createUser()">Sign Up</button><br />
    <button @click="logIn()">Log In</button>
  </div>
  <div v-if="!isUser">
    {{ Welcome }} Ji!<br />
    <button @click="logOut()">Log Out</button>
    <p></p>
    Whom do you want to send msg?
    <input id="receiverName" type="text" placeholder="Type his/her name" />
    <input id="msg" type="text" placeholder="Write your msg" />
    <button @click="sendMsg()">send</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { CometChat } from "@cometchat-pro/chat";

var authKey = "Addfa544c4278cff4eb8e833f06f731f5bf8af078";
let isUser = ref(true);
let Welcome = ref("Ram Ram");

//Creating a user
function createUser() {
  let userName = document.getElementById("userName").value;
  const options = {
    method: "POST",
    url: "https://246680802278b160.api-in.cometchat.io/v3/users",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apikey: "de4a80ee37ea9d4faebbe65f22f62e6fa5b0c53f",
    },
    data: {
      metadata: {
        "@private": { email: "user@email.com", contactNumber: "0123456789" },
      },
      uid: userName,
      name: userName,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      response.data.data.status = "online";
      console.log(
        `User has been created successfully!`,
        response.data.data.status
      );
    })

    .catch(function (error) {
      if (error.code == "ERR_BAD_REQUEST") {
        console.log(`User already exist!`);
      }
    });

  alert("User is created!");
}

//logging the user in
function logIn() {
  let userName = document.getElementById("userName").value;
  var UID = userName;
  var authKey = "ddfa544c4278cff4eb8e833f06f731f5bf8af078";

  CometChat.login(UID, authKey).then(
    (user) => {
      console.log("Login Successful:");
      // console.log("Login Successful:", { user });
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );

  isUser.value = !isUser.value;
}

//log out the user
function logOut() {
  CometChat.logout().then(
    () => {
      console.log("Logout completed successfully");
    },
    (error) => {
      console.log("Logout failed with exception:", { error });
    }
  );

  isUser.value = !isUser.value;
}

//create msg listener
onMounted(() => {
  let listener = document.getElementById("userName").value;
  let listenerID = listener;

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (message) => {
        document.querySelector(
          "p"
        ).innerHTML += `<div>${message.sender.name}:${message.text}</div>`;
        console.log("Text message received successfully", textMessage);
      },
    })
  );

  console.log("called");
});

//remove msg listener
function removeMsgListener() {
  let listener = document.getElementById("userName").value;
  let listenerID = listener;
  CometChat.removeMessageListener(listenerID);
}

//send the messages
function sendMsg() {
  let receiverID = document.getElementById("receiverName").value;
  let messageText = document.getElementById("msg").value;
  let receiverType = CometChat.RECEIVER_TYPE.USER;
  let textMessage = new CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  );

  CometChat.sendMessage(textMessage).then(
    (message) => {
      // console.log("Message sent successfully:", message);
      console.log("Message sent successfully:");
      document.querySelector(
        "p"
      ).innerHTML += `<div>${message.sender.name}:${message.text}</div>`;
    },
    (error) => {
      console.log("Message sending failed with error:", error);
    }
  );
}

onBeforeUnmount(() => {
  let listener = document.getElementById("userName").value;
  let listenerID = listener;
  CometChat.removeMessageListener(listenerID);
  console.log("removed");
});
//
</script>

<style scoped>
p {
  border: 2px solid red;
  width: 30rem;
  height: 30rem;
}
</style>
