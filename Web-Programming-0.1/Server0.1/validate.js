const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

//Connection for the mysql server, uses dotenv so code can be in repository without giving the actual
//information on server's username/password.
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.USERVAL,
    port: process.env.DB_PORT
});
//connect to mysql and throw an error in the event it doesn't work
connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    //Test to troubleshoot if a connection is failing here/
    //console.log('db ' + connection.state);
})

class userValidation{
    static getValidationInstace(){
        return instance ? instance : new userValidation();
    }

    async validate(){
        
    }
}