const socket = io()
const input = document.querySelector(".input")
const button = document.querySelector(".btn")
const username = document.querySelector(".user-name")
const form = document.querySelector(".chat_form")
const myLoc = window.location.href
const myStorage = window.localStorage
const userName = myStorage.name
const url = window.location.href
const messagesList = document.querySelector(".messages-list")
let linkMain = url.slice(0, url.indexOf("chat"))

let allMessages

fetch(`${linkMain}allmessages/`)
  .then(response => response.json())
  .then(json => {
	  if(json != "Clear") renderArr(json)
	})



async function postData(link, data){
	const response = await fetch(link, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	let res = await response.json
	return res
}

form.addEventListener('submit', (event)=>{
	event.preventDefault();
	if(input.value){
		socket.emit("chat message",{
			message: input.value,
			name: userName,
		})
		input.value = ""
	}
})

socket.on("chat message", (data)=>{
	renderer(data)
})

function renderer(data){
	rend(data)
}

function renderArr(arr){
	for(let i of arr){
		rend(i)
	}
}

function rend (obj){
	let a
	if(myStorage.name == obj.name){
		a = "admin_message"
	}
	else{
		a = "user_message"
	}
	let li = document.createElement("li")
	li.setAttribute("class", a)
	li.classList.add("message")
	li.innerHTML = `
		<span class="user-name">${obj.name}</span>
		<p class="message-text">${obj.message}</p>
		<span class="message-time">${obj.date}</span>
		`
	messagesList.appendChild(li)
	messagesList.scrollTo(0, messagesList.scrollHeight)
}

if(myStorage.name === undefined){
	window.location.href = linkMain
}