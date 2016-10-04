'use strict'

const express = require('express')
const {Server} = require('http')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const app = express()
const server = Server(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/TTT'
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res)=> res.render('index'))


mongoose.connect(MONGODB_URL, ()=> {
server.listen(PORT, ()=> console.log(`server listening on port: ${PORT}`))

})

const Game = mongoose.model('game', {
	board: [
		[String, String, String],
		[String, String, String],
		[String, String, String],
	]
})




io.on('connect', socket => {
	console.log(`socket connected ${socket.id}`)
	socket.on('disconnect', ()=> console.log(`socket disconnected: ${socket.id}`))
})
