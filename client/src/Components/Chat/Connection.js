import * as signalR from "@microsoft/signalr";

// Create the chat connection
const chatConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7143/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

// Start the chat connection
chatConnection.start()
    .then(() => console.log("Connected to ChatHub"))
    .catch(err => console.log("Error connecting to ChatHub: ", err));

// Handle chat messages
chatConnection.on("ReceiveChatMessage", (user, message) => {
    console.log("Chat message received from:", user, "Message:", message);
    // Update your chat state or UI here
});

// Create the notification connection
const notificationConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7143/notificationHub")
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

// Start the notification connection
notificationConnection.start()
    .then(() => console.log("Connected to NotificationHub"))
    .catch(err => console.log("Error connecting to NotificationHub: ", err));

// Handle notifications
notificationConnection.on("ReceiveNotification", (message) => {
    console.log("Notification received:", message);
    // Update your notification state or UI here
});

export { chatConnection, notificationConnection };
