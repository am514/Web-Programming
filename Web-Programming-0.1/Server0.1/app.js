//<--- INITIALIZATION CODE --->
//All the packages required and external files that are going to be used by the system.
const mysql = require('mysql');
const express = require('express');
const app = express();
//Allow for use of cookies and other session specific commands (Whether a user has logged in or not and keeping the session data secret)
const session = require('express-session');
//Pretty self explanatory, need this to parse the code sent to the server in order to extract the relevant
//data.
const bodyParser = require('body-parser');
const cors = require('cors');
//Using dotenv to conceal my configuration choices from people who don't need to know.
const dotenv = require('dotenv');
dotenv.config();
//ssssswsss
//Gets the leaderboard database code
const dbCall = require('./dbCall');
//Gets the user validation code to check and add users to the db
const userVal = require('./validate');
//Get access to http
const http = require("http");
const { response } = require('express');
//Get access to fs
const fs = require('fs').promises;
//Require socket for more immediate back and forth communications between players on 5432
var sock = require('socket.io').listen(5432);

//Setting which modules inside of Express are going to be used.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//<-- INITIALIZATION CODE AS IT RELATES TO THE VALIDATION AND REGISTRATION OF USERS -->

//Will be hashing the user passwords
const bcrypt = require('bcrypt');
const { privateDecrypt } = require('crypto');


//Session will track if someone is logged in or not and allow them to access the site as such.
app.use(session({
	secret: 'Porsmmzs13445.219./+dsmazndfjglasmz',
	resave: true,
	saveUninitialized: true
}));
//bodyParser is what will be used to extract the data we need from user form submissions
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//Connection to the user validation db
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.USERVALDB,
    port: process.env.DB_PORT
});

//<--- NON INITIALIZATION CODE --->
//Actual calls on the server and the responses fed from it to the client.


app.use(express.static(__dirname + '/Client'))

//This call will serve the gamePage for now
app.get("/playgame", function(req, res){
    if(req.session.loggedin == true){
        res.sendFile(__dirname + '/Client/gamePage.html');
    }
    else{
        res.redirect('retry.html');
    }
});

//When the user calls "/" they will be taken to the index page, unless they have a valid session.
app.get("/", function(req, res){
    if(session.loggedin == true){
        res.redirect('welcome.html');
    }else{
        res.sendFile(__dirname +'/Client/index.html')
    }
} );

app.post("/score", function(req, res){
    var newScore = req.body.score;
    var userName = req.body.playerName;
    connection.query('SELECT score FROM userval WHERE username = ?', [userName], function (error, results, fields){
        if(error) throw error;
        if(newScore > results[0].score){
            connection.query('UPDATE userval SET score = ? WHERE username = ?' [newScore, userName], function (error, resulsts, fields){
                if(error) throw error;
                console.log('Success');
                res.redirect('/welcome');
            });
        }
    });
});
app.post("/guest", function(req, res){
        req.session.username = "Guest_" + req.body.playerName;
        res.redirect("/playGame");
});
//This is the login code and dictates if someone logs in or not.
app.post("/auth", async function(req, res){
    //These variables are for the username and the password pulled from the request.
    var playerName = req.body.playerName;
    var password = req.body.password;

    console.log(playerName);
    console.log(password);
    //If the password and username sections are filled out then we check if it is a valid username.
    if(password && playerName){
        //SQL query, to grab the password associated with a given username. Uses string escaping to keep people from injecting into the 
        //db call.
        connection.query('SELECT password FROM userval WHERE username = ?', [playerName], async function(error, results, fields) {
            if(error) throw error;
           //If there are no results don't bother doing any checks, send them to error page.
            if (results.length > 0) { 
                //console.log(req.body.password);
                //console.log(results[0].password);
                
                //Check the validity of pass hash and store it as a boolean
                const match = await bcrypt.compare(req.body.password, results[0].password);
                //If the hash is a valid hash
                if(match){
                    console.log('Success')
                    //Sets the session id (cookie) to true so the player can access other sections of the site.
                    req.session.loggedin = true;
                    //sets the session username to the one given by the player(For the welcome page to make it more personalized)
                    req.session.username = playerName;
                    //Lastly takes the user to the /welcome
                    res.redirect('/welcome');
                }
                //If the hash is not a valid hash send them to wrong password page
                else{
                    res.redirect('retry_pass.html');
                }
            //Error page
			} else {
				res.redirect('retry.html');
            }
            //end res			
			res.end();
		});
    }
    else{
        //If something weird has happened (missing data, corrupted data, whatever) send the user to the general
        //error page.
        res.redirect('retry.html');
        res.end();
    }
    
});
app.get('/player_pos', function(req, res){
    connection.query('SELECT position FROM userval', function(error, result, fields){
        if(error) throw error;
        else{
            res.json(result);
        }
    });
});

app.post('/user_pos', function(req, res){
    var user_pos = req.body.xpos;
    var player = req.session.playerName;
    connection.query('UPDATE userval SET position = ? WHERE username = ?', [user_pos, player], function(error, results, fields){
        if (error) throw error;
    });
});

app.post('/signout', function(req, res){
    req.session.loggedin = false;
    res.redirect('index.html');
});

//The auth section was getting too big. Just redirects people to the welcome page.
app.get('/welcome', function(req, res){
    if(req.session.loggedin){
        res.redirect('welcome.html');
    }
    else{
        res.redirect('retry.html');
    }
});
//This is the code to register a user account. I honestly could have chosen better names for the
//data being sent this way....
app.post('/register', async (request, response) =>{
    //username in the form
    var username = request.body.reg_playerName;
    //password in the form
    var givenPassword = request.body.reg_password;
    //retype of password in form
    var passCheck = request.body.reg_password2;
    //email in the form
    var email = request.body.reg_email;
    //If the passwords don't match let the user know.
    if(givenPassword != passCheck){
        response.redirect('/retry_passfail.html')
    }
    else{
    //Sets the salt rounds to 15, takes awhile but 2^15 is a nice amount of security for what my laptop can handle
    const salt = await bcrypt.genSalt(15);
    //Set the password to the hash value generated from it
    givenPassword = await bcrypt.hash(givenPassword, salt);
   
   /* Breathing space between code chunks
   Also a bit of rant, HOW DO I MAKE THIS RETURN A POPUP?? I can't figure that one out
   if any of you guys figure that out let me know so I can get that put in place, I hate all these
   extra pages...
   -RB
   */ 
       
    //Make sure the user has actually filled out the form. 
    if(username && givenPassword && email){
        //Checks that the username is available. Could be set to do the same for email but I haven't gotten
        //email validation done yet so meh.
        connection.query('SELECT username FROM userval WHERE username = ?', [username], function(error, results, fields) {
            if(error) throw error;
            //If the results have a length greater than 1 then it means we have a hit. User account is already registered and we shift the user over the error page as a result.
            if (results.length > 0) {
                //If anything comes back let them know that username is taken.
                response.redirect('retry_user.html');
            }
            //The user account name is available
            else{
                //inserts the values given to us
                connection.query('INSERT INTO userval (username, password, email) VALUES (?, ?, ?)', [username, givenPassword, email], function(error, results, fields){
                    if(error) throw error;
                    console.log('Success')
                    //Sets the session id (cookie) to true so the player can access other sections of the site.
                    request.session.loggedin = true;
                    //sets the session username to the one given by the player(For the welcome page to make it more personalized)
                    request.session.username = username;
                    //Lastly takes the user to the /welcome
                    response.redirect('/welcome');
                });
            }

		});
    }
    else{
        response.redirect('retry_reg.html');
    }
}

});
//THIS IS GOING TO BE DELETED UNLESS I DREAM UP A USE.
app.get('/validate', (request, response) => {

});
//Leaderboard page.
app.get('/getAll', (request, response) => {
    const db = dbCall.getDbCallInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err=> console.log(err));

});
// Mubeen code

//list of sockets
var SOCKET_LIST = {};
// list of players
var PLAYER_LIST = {};

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

// This is for creating the player
var Player = function(id){
	var self = {
		character : document.createElement("div"),
		x : 400,
		y : 778,
		width : 50,
		height : 20,
		color : "green",
		sketched : false,
		velocity : 10,
		acceleration : 1.25,
		movingLeft : false,
		movingRight : false,

	}
  // for updating their movement
	self.updatePosition = function(){
		if(self.pressingRight)
			self.x += self.velocity;
		if(self.pressingLeft)
			self.x -= self.velocity;
	}
	return self;
}


sock.sockets.on('connection', function(socket){
    // creates an id for a new spcket
    socket.id = Math.random();
    // adds it to the list of sockets
    SOCKET_LIST[socket.id] = socket;
    // for a new player
    var player = Player(socket.id);
	  PLAYER_LIST[socket.id] = player;
    //Keeps tabs of the total number of people are connected to the socket.
    numSock++;
    //TEMP: let us know if someone connects and then post the total, delete after done testing the socket connections
    //or transition this into an update that will be listed on the chat in a non-obtrusive way
    sock.sockets.emit("New user connected, total online " + numSock);
    console.log('Success Socket');
})
sock.sockets.on('disconnect', function(socket){
    //Keeps tabs of total number of people connected to the socket.
    numSock--;
    // deletes the socket and player from the arrays
    delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
    //TEMP: Let us know if someone has disconnected and then post the total, delete after done testing the socket connections
    //or transition this into an update that will be listed on the chat in a non-obtrusive way
    sock.sockets.emit("User disconnected, total online " + numSock);
});
// for movement for player object
sock.on('keyPress',function(data){
		if(data.inputId === 'left')
			player.pressingLeft = data.state;
		else if(data.inputId === 'right')
			player.pressingRight = data.state;
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

// updates all the players positon by running every 50 milliseconds
// (20fps)
setInterval(function(){
	var pack = [];
	for(var i in PLAYER_LIST){
		var player = PLAYER_LIST[i];
		player.updatePosition();
		pack.push({
			x:player.x,
			y:player.y,
			number:player.number
		});
	}
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('newPositions',pack);
	}




},1000/25);



app.listen(process.env.PORT, () => console.log('app is running'));