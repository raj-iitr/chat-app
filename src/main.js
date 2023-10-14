import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { CometChat } from "@cometchat-pro/chat";


let appID = "246680802278b160";
let region = "in";
let appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  (error) => {
    console.log("Initialization failed with error:", error);
  }
);

createApp(App).mount("#app");