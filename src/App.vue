<template>
  <div v-if="isUser">
    <input id="msg" type="text" />
    <p></p>
    <button v-if="isUser" @click="createUser()">Start chatting</button>
    <button v-if="isUser" @click="logIn()">LogIn</button>
    <button v-if="isUser" @click="logOut()">LogOut</button>
    <button v-if="isUser" @click="sendMsg()">send</button>
    <!-- <button v-if="isUser" @click="createMsgListener()">listen</button> -->
  </div>
  <!-- <div v-else>
    <p id="chats">Chats will be visible here</p>
    <input id="msg" type="text" placeholder="Enter your message" />
    <input id="sendBtn" type="button" value="send" />
  </div> -->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { CometChat } from "@cometchat-pro/chat";

var authKey = "Addfa544c4278cff4eb8e833f06f731f5bf8af078";
let isUser = ref(true);
// let msgs = ref(" ");

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
      uid: "user4",
      name: "user4",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

//logging the user in
function logIn() {
  var UID = "user1";
  var authKey = "ddfa544c4278cff4eb8e833f06f731f5bf8af078";

  CometChat.getLoggedinUser().then(
    (user) => {
      if (!user) {
        CometChat.login(UID, authKey).then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      }
    },
    (error) => {
      console.log("Something went wrong", error);
    }
  );
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
}

//create msg listener
// function createMsgListener() {
onMounted(() => {
  let listenerID = "user1";

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
// }

//remove msg listener
function removeMsgListener() {
  let listenerID = "user1";
  CometChat.removeMessageListener(listenerID);
}

//send the messages
function sendMsg() {
  let receiverID = "user1";
  let messageText = document.getElementById("msg").value;
  let receiverType = CometChat.RECEIVER_TYPE.USER;
  let textMessage = new CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  );

  CometChat.sendMessage(textMessage).then(
    (message) => {
      console.log("Message sent successfully:", message);
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
  let listenerID = "user1";
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
