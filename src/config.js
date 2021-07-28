const getIPAddress = require('./lib/getIp.js');
const IP = getIPAddress(false);
const PORT = process.env.PORT || 5050;
const host = "localhost";

module.exports={
	PORT,
	host,
	IP
}
