var mongoose = require('mongoose');
const database = require('../util/config').database;

const db_url = 'mongodb+srv://' + database.user + ':' + database.password + '@nodeproject-tu8wo.mongodb.net/'+ database.name +'?retryWrites=true';


const connection = mongoose.connect(db_url, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

if(mongoose.connection.readyState === 2){
    console.log("Connection to MongoDB is created.");
}else{
    console.log("Failed to connect to MongoDB.");
}

module.exports = connection;