import { HubConnection } from "@microsoft/signalr";

export default interface IWebSocket {
    webSocket: HubConnection;
  }
  