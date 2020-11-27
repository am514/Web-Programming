const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

//establish connection to the database. 

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.USERVALDB,
    port: process.env.DB_PORT
});

//Actually connect to the server
connection.connect((err) =>{
    if(err){
        console.log(err.message);
    }
    //console.log('db ' + connection.state);
})


//This class manages the calls to the database for the leaderboard.
class dbCall{
    //Pretty self explanatory
    static getDbCallInstance(){
        return instance ? instance : new dbCall();
    }
    //Asynchronously gets the data from the server to make the data available for processing
    async getAllData(){
        try{
            //Store the returned value in here to send out
            const response = await new Promise((resolve, reject) => {
                //The query which we will be sending to the db
                const query = 'SELECT username, score, gamesplayed FROM `userval` ORDER BY score DESC;';
                //The actually query sending and resolution of any errors gets the score username and how many games they have played
                connection.query(query, (err, results) =>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
    
}

module.exports = dbCall;