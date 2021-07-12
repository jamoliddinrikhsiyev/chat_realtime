const path = require("path")
const fs = require("fs")
const { isObject } = require("util")
const { allmessages } = require("../model/messages.js")


function GET(req, res){
	res.sendFile(path.join(process.cwd() + "/src" + "/views" + "/chat.html"))
}

function getMess(req, res){
	if(allmessages.length != 0){
		res.status(201).json(allmessages)
	}
	else{
		res.status(404).json("Clear!")
	}
}

module.exports = {
	GET,
	getMess,
}