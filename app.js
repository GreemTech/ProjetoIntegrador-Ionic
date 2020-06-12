/*const app = require('../backend/bin/express.js')
const variavel = require('../backend/bin/configuration/variaveis.js')
*/
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()


//router

const usuarioRouter = require('./routes/usuario.js')

app.use(express.json())
    //config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



//banco



mongoose.Promise = global.Promise;
const uri = "mongodb+srv://gremm:16051999@greem-2wxwa.mongodb.net/administrador?retryWrites=true&w=majority";
mongoose.connect(uri, {
    dbName: 'administrador',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Conectado!")
}).catch((err) => {
    console.log("houve um erro ao se conectar." + err)
})



app.use('/api/usuario', usuarioRouter)



module.exports = app;

app.listen(3000, () => {
    console.info("Api inicializada")
})