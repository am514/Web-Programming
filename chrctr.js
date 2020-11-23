var SOCKET_LIST = {};
var PLAYER_LIST = {};


var Player = function(id){
    var self = {
        x:250,
        y:250,
        id:id,
        number:"" + Math.floor(4* Math.random()),
        pressingRight: false,
        pressingLeft: false,
        pressingDown: false,
        pressingUP: false,
        spd:12,
    }
    self.updatePosition = function(){ //player movement
            self.x += self.spd;
        if(self.updatePositionleft)
            self.x -= self.spd;
        if(self.updatePositionDown)
            self.y -= self.spd;
        if(self.updatePositionUp)
            self.y += self.spd;
    }
    return self;
    
}
var io = require('socket.io')(serv,{}); //whenever a person connects it will update their x and y position
io.sockets.on('connection', function(socket){
    socket.id = Math.random(); //creates unique socket id and sets its x and y to 0
    socket.x = 0;
    socket.y = 0;
    SOCKET_LIST[socket.id] = socket; //gets updated in this list


    var player = Player(socket.id); //players coordintates get added to the individual players position
    PLAYER_LIST[socket.id] = player;
})

setInterval(function(){ //loop interval called every 4ms it loops through each player and sends a 
                //updates the position of each player
    var package =[];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        player.updatePosition();    
        package.push({
            x:player.x,
            y:player.y,
            number:player.number
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPosition', package); 
    }
},10000/25); //the set interval called every 4ms. so sends package loop 
