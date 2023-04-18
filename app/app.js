import { createPlayer, createPlayers, removePlayer, players } from "./players.js"
const [w, h] = [window.innerWidth, window.innerHeight]

const canvas = document.createElement('canvas')
canvas.width = w
canvas.height = h

document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const pre_player = document.querySelector("div#stats > pre#player")
const pre_players = document.querySelector("div#stats > pre#players")

const player = {
    name: `player-${Math.floor(Math.random() * 100)}`,
    x: Math.floor(w / 2),
    y: Math.floor(h / 2),
    color: '#000000',
}
pre_player.innerText = JSON.stringify(player, null, 2)

function drawPlayer(ctx, ply) {
    ctx.fillStyle = ply.color
    ctx.fillRect(ply.x - 5, ply.y - 5, 10, 10)
}

function draw() {
    ctx.clearRect(0, 0, w, h)
    
    for(const ply of players) {
        drawPlayer(ctx, ply)
    } 
    drawPlayer(ctx, player)
    requestAnimationFrame(draw)
}
draw()

function changePositionPly(ply, value) {
    if(ply.x + value.x < 0 || ply.x + value.x > w) return
    if(ply.y + value.y < 0 || ply.y + value.y > h) return
    ply.x += value.x
    ply.y += value.y
}

const ws = new WebSocket('ws://localhost:8080')
ws.onopen = () => {
    ws.send(JSON.stringify({
        type: 'createPlayer',
        player
    }))
}
ws.onmessage = e => {
    const data = JSON.parse(e.data)
    if(data.type === 'createPlayer') createPlayer(data.player) 
    else if(data.type === 'removePlayer') removePlayer(player.name) 
    else if(data.type === 'update')  {
        if(data.player.name === player.name) return
        const ply = players.findIndex(ply => ply.name === data.player.name) 
        players[ply].x = data.player.x
        players[ply].y = data.player.y
        pre_players.innerText = JSON.stringify(players, null, 2)
    } else if(data.type === "players") {
        createPlayers(data.players)
        pre_players.innerText = JSON.stringify(players, null, 2)
    }
}

document.addEventListener('keydown', e => {
    if(e.key === 'z') changePositionPly(player, { x: 0, y: -10 })
    if(e.key === 's') changePositionPly(player, { x: 0, y: 10 })
    if(e.key === 'q') changePositionPly(player, { x: -10, y: 0 })
    if(e.key === 'd') changePositionPly(player, { x: 10, y: 0 })
    ws.send(JSON.stringify({
        type: 'update',
        player
    }))
    pre_player.innerText = JSON.stringify(player, null, 2)
})