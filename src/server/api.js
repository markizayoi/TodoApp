const client = require('./connectionpg.js')
const express = require('express');
const app = express();

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/todos', (req, res) => {
    client.query(`Select * from todos`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todos = req.body;

    let insertQuery = `insert into todos(task_name, date, completed) 
                       values('${todos.task_name}', '${todos.date}', ${todos.completed})`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.put('/todos/:task_id', (req, res) => {
    let todos = req.body;
    let updateQuery = `update todos
                       set task_name = '${todos.task_name}',
                       completed = ${todos.completed}
                       where task_id = ${todos.task_id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.delete('/todos/:task_id', (req, res) => {
    let deleteQuery = `delete from todos where task_id=${req.params.task_id}`

    client.query(deleteQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.delete('/todos', (req, res) => {
    client.query(`Delete from todos`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})