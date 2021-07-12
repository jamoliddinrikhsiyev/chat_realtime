const path = require("path")
const express = require("express")
const app = express()
const model_users = require("../model/users.js")
const {allmessages} = require("../model/messages.js")
let users = model_users.users
const fs = require("fs")


function GET(req, res){
	res.sendFile(path.join(process.cwd() + "/src" + "/views" + "/index.html"))
}

function all_users(req, res){
	res.json(users)
}

function allMessages(req, res){
	if(allmessages.length != 0){
		res.json(allmessages)
	}
	else{
		res.status(404).json("Clear")
	}
}

function addUser(req, res){
	let data = req.body
	console.log(data)
	let obj = {}
	let userID = users.length != 0 ? users.length + 1 : 1
	obj.user_id = userID
	obj.name = req.body.name
	users.push(obj)
	let s = JSON.stringify(users, null, 4)
	fs.writeFileSync(path.join(process.cwd(), "src", "database", "users.json"), s)
	res.status(200).json("The user has writed!")
}

module.exports = {
	GET,
	all_users,
	addUser,
	allMessages
}