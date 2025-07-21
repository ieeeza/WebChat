import * as signalR from "@microsoft/signalr";

export default function createSignalRConnection(token, onReceiveMessage) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7071/chats", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("ReceiveMessage", onReceiveMessage);

  return connection;
}
