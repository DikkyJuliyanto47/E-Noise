import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("🔌 Client connected");

  ws.on("message", (data) => {
    const text = data.toString();
    console.log("📩 Received:", text);

    // broadcast ke semua client (browser dll)
    for (const client of wss.clients) {
      if (client.readyState === 1) {
        client.send(text);
      }
    }
  });

  ws.on("close", () => {
    console.log("🔌 Client disconnected");
  });
});

console.log(`✅ WS server listening on ws://localhost:${PORT}`);
