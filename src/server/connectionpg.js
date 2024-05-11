const {Client} = require ('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "midnight47",
    database: "TodoApp"
})

module.exports = client;