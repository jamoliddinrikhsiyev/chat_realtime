const express = require("express")
const app = express()
const path = require("path")
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const fs = require("fs")

const {PORT, host, IP} = require('./config.js')
const homeControllers= require("./controllers/home.js")
const chatControllers = require("./controllers/chat.js")
const {allmessages} = require("./model/messages.js")
const date = new Date
let myDate = `${date.getFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}/${date.getHours()}:${date.getMinutes()}`






// Requestga keladigan barcha controllerlar "/contrlollers/" ichida joylashgan bolib  route lar boyicha bolib chiqilgan


app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.get("/all-messages", chatControllers.getMess)
app.get("/", homeControllers.GET)
app.get("/users", homeControllers.all_users)
app.get("/chat", chatControllers.GET)
app.get("/allmessages", homeControllers.allMessages)
app.post("/adduser", homeControllers.addUser)



io.on('connection', (socket)=>{
	socket.on("chat message", (data)=>{
		io.emit("chat message",{
			message: data.message,
			name: data.name,
			date: myDate
		})
		let message_id = allmessages.length != 0 ? allmessages.length + 1 : 1
		let mess = {
			message_id,
			name: data.name,
			message: data.message,
			date: myDate
		}
		allmessages.push(mess)
		let messages = JSON.stringify(allmessages, null, 4)
		fs.writeFileSync(path.join(__dirname, "database", "messages.json"), messages)
	})
})

http.listen(PORT, () => {
	console.log(`Server is runing on http://${IP}:${PORT}`);
})

// res.sendFile(path.join(process.cwd() + "/src" + "/views" + "/index.html"))

// 	res.sendFile(path.join(process.cwd + "/src" + "/views" + "/index.html"))