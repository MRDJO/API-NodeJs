const { Pokemon } = require('../db/sequelize')
 
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null){
        const message = `Le pokemon demandé n'existe pas.Ressayez avec un autre identifiants🙂`
        res.status(404).json({message})
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error =>{
      const message= `Le pokemon n'as pas pu être supprimé.Ressayez dans quelques instants!😟`
      res.status(500).json({message, data: error}) 
    })
  })
}