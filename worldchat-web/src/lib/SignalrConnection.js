import * as signalR from "@microsoft/signalr";

export default function createSignalRConnection(token, onReceiveMessage) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5096/chats", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
  
  console.log("SignalR connection created", token);

  connection.on("ReceiveMessage", onReceiveMessage);

  return connection;
}
