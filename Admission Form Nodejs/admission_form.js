// MiddleWare or Basic

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json()) // MiddleWare or Basic

// Create Pool for MySql database Connection

const pool = mysql.createPool({

    host     : "localhost",
    user     : "root",
    password : "",
    database : "gmc"

});

// Callback function for retrieving [GET] all data from database
app.get('/admissions' , (req , res) =>{

    // pool.getconnection() is used to gain database connection
    pool.getConnection((err , connection) =>{

        if(err) throw err
        console.log(`Connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM admissions' , (err , rows) =>{
        connection.release() // return the connection to pool

        if(!err)
        {
            res.send(rows)
        }
        else
        {
            console.log(err)
        }
        })
    })
})

// Callback function for retrieving [GET] all data at the specific id from database
app.get('/:id' , (req , res) =>{

    // pool.getconnection() is used to gain database connection
    pool.getConnection((err , connection) =>{

        if(err) throw err
        console.log(`Connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM admissions WHERE id = ?' , [req.params.id],  (err , rows) =>{
        connection.release() // return the connection to pool

        if(!err)
        {
            res.send(rows)
        }
        else
        {
            console.log(err)
        }
        })
    })
})

// Callback function for deleting
app.delete('/:id' , (req , res) =>{

    // pool.getconnection() is used to gain database connection
    pool.getConnection((err , connection) =>{

        if(err) throw err
        console.log(`Connected as id ${connection.threadId}`)

        connection.query('DELETE FROM admissions WHERE id = ?' , [req.params.id],  (err , rows) =>{
        connection.release() // return the connection to pool

        if(!err)
        {
            res.send(`admissions with record id : ${[req.params.id]} has been removed.`)
        }
        else
        {
            console.log(err)
        }
        })
    })
})

// adding new records
app.post('' , (req , res) =>{

    // pool.getconnection() is used to gain database connection
    pool.getConnection((err , connection) =>{

        if(err) throw err
        console.log(`Connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO admissions SET ?' , params ,  (err , rows) =>{
        connection.release() // return the connection to pool

        if(!err)
        {
            res.send(`admissions with record id : ${params.id} has been added.`)
        }
        else
        {
            console.log(err)
        }
        })
    })
})

// Update records
app.put('' , (req , res) =>{

    // pool.getconnection() is used to gain database connection
    pool.getConnection((err , connection) =>{

        if(err) throw err
        console.log(`Connected as id ${connection.threadId}`)

        const {id , Full_Name} = req.body

        connection.query('UPDATE admissions SET Full_Name = ? WHERE id = ? ' , [Full_Name,id] , (err , rows) =>{
        connection.release() // return the connection to pool

        if(!err)
        {
            res.send(`The record of id : ${id} in admissions table has been updated.`)
        }
        else
        {
            console.log(err)
        }
        })
        console.log(req.body)
    })
})



app.listen(port , () => console.log(`Listening on Port ${port}`))