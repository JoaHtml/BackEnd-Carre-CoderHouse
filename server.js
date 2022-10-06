const express = require('express')
const { Server: IOServer } = require('socket.io')
const http = require('http')
const path = require('path')
const indexRouter = require('./routes/index')

const PORT = process.env.PORT || 3000

const app = express()

app.use('/', indexRouter)

const server = http.createServer(app)
const io = new IOServer(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

server.listen(PORT, () => console.log('servidor en línea'))

const messages = [
    { author: "Juan", text: "Hola, ¿que tal?" },
    { author: "Pedro", text: "Bien, ¿y vos?" },
    { author: "Ana", text: "¡Genial!" }
]

io.on('connection', (socket) => {
    console.log('usuario conectado')
    socket.emit('messages', messages)
})