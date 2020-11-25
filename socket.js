//creates socket list
var SOCKET_LIST = {};











var io = require('socket.io')(serv,{}); 
//whenever a person connects it will update their x and y position

io.sockets.on('connection', function(socket){
    socket.id = Math.random(); 
    //creates unique socket id and sets its x and y to 0
    //sets x position
    socket.x = 0;
    
    //sets y position
    socket.y = 0;
    
    SOCKET_LIST[socket.id] = socket;



})
    //gets updated in this list