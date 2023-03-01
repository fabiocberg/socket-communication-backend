import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const port = Number(process.env.PORT || 3002);

const io = new Server(port, {
    cors: {
        origin: "*",
    },
});

let isLogged = false;

function sendMessage(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
    if (socket.connected) {
        // verificando se ainda está conectado
        isLogged = !isLogged;
        console.log("isLogged: ", isLogged);
        socket.emit(
            "is-logged-message", // o nome do evento, pode ser qualquer nome
            JSON.stringify({ isLogged: isLogged }) // o dado enviado pode ser qualquer tipo
        );
    }
}

function start(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
    setInterval(() => {
        // apenas para simulação
        sendMessage(socket);
    }, 10000);
}

io.on("connection", async (socket) => {
    console.log("connected id: ", socket.id);
    start(socket);
    socket.on("disconnect", async () => {
        console.log("disconnected");
        // o cliente desconectou
    });
});

console.log(`SocketIO is listening on port ${port}`);
