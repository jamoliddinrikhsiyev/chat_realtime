const getIPAddress = require('./lib/getIp.js')
const IP = getIPAddress(false)
const PORT = 5500
const host = "localhost"

module.exports={
	PORT,
	host,
	IP
}