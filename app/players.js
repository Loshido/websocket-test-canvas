const players = []
const colors = [
    "#5865F2", "#57F287", "#FEE75C", 
    "#EB459E", "#ED4245"
]

function createPlayer(ply) {
    const color = colors[Math.floor(Math.random() * colors.length)]
    players.push({
        name: ply.name,
        x: ply.x, 
        y: ply.y,
        color
    })
}

function createPlayers(plys) {
    for(const ply of plys) {
        createPlayer(ply)
    }
}

function removePlayer(name) {
    const index = players.findIndex(ply => ply.name === name)
    players.splice(index, 1)
}

export { createPlayer, createPlayers, removePlayer, players }