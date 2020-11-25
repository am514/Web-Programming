//creates socket list
var SOCKET_LIST = {};


var io = require('socket.io')(serv,{}); 

io.sockets.on('connection', function(socket){
    socket.id = Math.random(); 
    //creates unique socket id and sets its x and y to 0
    //sets x position
    socket.x = 0;
    
    //sets y position
    socket.y = 0;
    socket.number ="" + Math.floor(10*Math.
    random());
    //every socket is mulitplied by 10 buy is random
    SOCKET_LIST[socket.id] = socket;


   
   
   
   
   
    socket.on('disconnect', function(){
        delete SOCKET_LIST[socket.id];
        //disconnect function added. 
        //once disconnected removes the socket from 
        //socketlist

    });


});



setInterval(function(){ //loop interval called every 40ms it loops through each socket and sends a 
    //updates the position of each socket
var package =[];
//loops through the package and updates the socket in the package
for(var i in SOCKET_LIST){
var socket = SOCKET_LIST[i];
    socket.x++;
    socket.y++;
    package.push({
        x:socket.x,
        y:socket.y,
        number:socket.n

    });
}
for(var i in SOCKET_LIST){
//loops through the socket updating the new positions
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', package); 
//on the html side of things the "new positions" must be matched for 
//it to be useful
}
},1000/25); 
//the set interval called every 40ms. so sends 
//package loop
