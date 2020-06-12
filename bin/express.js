const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

//router

const usuarioRouter = require('../routes/usuario.js')

app.use(express.json())
    //config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



//banco

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://gremm:<16051999>@greem-2wxwa.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Conectado!")
    }).catch((err) => {
        console.log("houve um erro ao se conectar." + err)
    })
    /*const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://gremm:<password>@greem-2wxwa.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
    }); */

app.use('/api/usuario', usuarioRouter)



module.exports = app;