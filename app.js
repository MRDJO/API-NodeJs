const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())



sequelize.initDb()

//POINT DE TERMINAISON(routes) / endPoint
require("./src/routes/findAllPokemons")(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

//On ajoute la gestion des erreurs 404
app.use(({res}) =>{
    const message = "Impossible de trouver la ressources, veuillez essayer un autre URL 🧐"
    res.status(404).json({message})
})

app.listen(port,() =>console.log("Notre application vient d'être démarré  sur http://localhost:"+port))