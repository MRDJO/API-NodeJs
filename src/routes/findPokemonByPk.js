const { Pokemon } = require('../db/sequelize')
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = `Le pokemon demandé n'existe pas.Ressayez avec un autre identifiants🙂`
          res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error =>{
        const message= `Le pokemon n'as pas pu être récupéré.Ressayez dans quelques instants!😟`
        res.status(500).json({message, data: error}) 
      })
  })
}