const form = document.querySelector("form")
const input_name = document.querySelector(".username")
const btn = document.querySelector(".button")
const url = window.location.href;
const myStorage = window.localStorage
let ap = `${url}adduser`
console.log(ap);


if(myStorage.name){
	window.location.href = `${url}chat/`
}
console.log(url);


async function postData(api, data){
	const response = await fetch(api, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	let res = await response
	return res
}

function addUser(){
	let obj = {
		name: input_name.value,
	}
	let res 
	postData(ap, obj).then(response => response.status).then(status => {
		if(status == 200){
			window.localStorage.setItem("name", input_name.value)
			console.log(status)
			window.location.href = `${url}chat/`
		}
	})
	return res
}

form.addEventListener("submit", (event)=>{
	event.preventDefault();
	addUser();
})
