const {Client} = require ('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "midnight47",
    database: "TodoApp"
})

module.exports = client;

{/*
client.query(`Select * from todos`, (error, result) => {
    if (!error) {
        console.log(result.rows);
    } else {
        console.log(error.message);
    }

    client.end;
})
*/}