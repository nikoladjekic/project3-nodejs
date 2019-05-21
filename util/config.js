const dotenv = require('dotenv').config();

const host = process.env.HOST;
const port = process.env.PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database_name = process.env.DB;
const server_port = process.env.SERVER_PORT;


module.exports = {
    database:{
        host: host,
        port: port,
        user: username,
        password: password,
        name: database_name
    },
    server:{
        port: server_port
    }
}