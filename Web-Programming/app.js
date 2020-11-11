const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
//sssssw
const dbCall = require('./dbCall');
var sock = require('socket.io').listen(5432);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/insert', (request, response) =>{
    
});

app.get('/validate', (request, response) => {

});

app.get('/getAll', (request, response) => {
    const db = dbCall.getDbCallInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err=> console.log(err));

});
//----MUBEEN---- Under here is the socket code for you, everything above is to provide some abstracted connection
//to the database I have inside. I will knit in the socket connections as well, but for now add whatever
//you need here and I will work it in as it appears. I have shifted the actual server connection here as well
//if you need to mod it for your ports feel free. Check the package.json file for all npm modules added.
var msgDb = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})
var chatGen = false;
var numSock = 0;
tmpMSG = [];
sock.sockets.on('connection', function(socket){
    //Keeps tabs of the total number of people are connected to the socket.
    numSock++;
    //TEMP: let us know if someone connects and then post the total, delete after done testing the socket connections
    //or transition this into an update that will be listed on the chat in a non-obtrusive way
    sock.sockets.emit("New user connected, total online " + numSock);
})
sock.sockets.on('disconnect', function(socket){
    //Keeps tabs of total number of people connected to the socket.
    numSock--;
    //TEMP: Let us know if someone has disconnected and then post the total, delete after done testing the socket connections
    //or transition this into an update that will be listed on the chat in a non-obtrusive way
    sock.sockets.emit("User disconnected, total online " + numSock);
});
//This next bit is for the use of the socket for the chat app.
//The message is going to require the given users username so when the messages are emitted
//they contain the username and message.
sock.on('new message', function(msg){
    tmpMSG.push(msg);
    sock.sockets.emit('new message', msg)
    db.query('INSERT INTO chat (msg) VALUES (?)', msg.tmpMSG)
})
//For the chat as well, to check if things are already loaded or not
if (! chatGen) {
    msgDb.query('SELECT * FROM chat')
        .on('result', function(data){
            tmpMSG.push(data)
        })
        .on('end', function(){
            sock.emit('initial notes', tmpMSG)
        })

    chatGen = true
} else {
    // Initial notes already exist, send out
    socket.emit('initial notes', tmpMSG)
}

sock.on('newMove', function(move){
    sock.emit('newMove', move)
})



app.listen(process.env.PORT, () => console.log('app is running'));