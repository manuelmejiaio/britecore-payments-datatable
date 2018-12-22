// Assuming you have already done "npm install fernet"
let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message ='gAAAAABcDoq5reW93MLgk5_RRNvi9p__hh5dFz0iSMBIW0EqtJtpgQhtWj2sNyLy7d7ZJZ5XnCyV10Fx1nz7pDjXEciZgaNzUrmJDooRvGCQMmAWPMG_WL52jXS5vaUuNLGyea9_NUiZZu6AOCBd4Ui5psxDjj9lwfcPV5QkVfsEZDRY9fDNPrHaRJ4bXPlUX7ib1yNI0fP8'
let token = new fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode())