const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.USERVALDB,
    port: process.env.DB_PORT
});

connection.connect((err) =>{
    if(err){
        console.log(err.message);
    }
    //console.log('db ' + connection.state);
})

class dbCall{
    static getDbCallInstance(){
        return instance ? instance : new dbCall();
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT username, score FROM `userval`;';

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