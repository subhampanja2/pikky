import http from "http";
import next from "next";
import { Server as SocketServer } from "socket.io";
import { getAllFlights } from "./lib/actions/flight.actions";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const httpServer = http.createServer(handler);

  const io = new SocketServer(httpServer);

  io.on("connection", async (socket) => {
    console.log('connect be');
    try {
      const flights = await getAllFlights();
      socket.emit("flights-list", flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Handle the error if getAllFlights() fails
    }
  });

  httpServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
