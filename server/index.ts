import WebSocket from "ws";
import server from "./server";

const wss = new WebSocket.Server({ server });

interface Player {
    name: string,
    x: number,
    y: number,
    color: string
}

var players: Player[] = []

wss.on('connection', (ws: WebSocket) => {

    function sendToAllClients(fn: Function, except?: WebSocket) {
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN && except !== client) fn(client)
        })
    }

    console.log("New client connected");
    
    ws.send(JSON.stringify({type: "players", players}))

    ws.on("message", (message: string) => {
        const data = JSON.parse(message)
        if(data.type === "createPlayer") {
            // On met à jour la liste des joueurs
            players.push(data.player)

            // On informe tout les clients du nouveau joueur
            sendToAllClients((client: WebSocket) => {
                client.send(JSON.stringify({
                    type: "createPlayer",
                    player: data.player
                }))
            }, ws)

            // On retire le joueur si il se déconnecte
            console.log(players)
            ws.on("close", () => {
                players = players.filter(player => player.name !== data.player.name)
                sendToAllClients((client: WebSocket) => {
                    client.send(JSON.stringify({
                        type: "removePlayer",
                        name: data.player.name
                    }))
                })
                console.log("a client is closing")
                console.log(players)
            })
        } else if (data.type === "update") {
            const player = players.find(player => player.name === data.player.name)
            if(player) {
                player.x = data.player.x
                player.y = data.player.y
            }
            wss.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN && client !== ws) {
                    client.send(JSON.stringify({type: "update", player}))
                }
            })
        }
    });
});

server.listen(8080, () => {
    console.log(`Server started on port 8080 :)`);
});
