const ValidTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris.'
        },
        validate: {
          notEmpty: {msg : `Le champ name de doit pas être vide`},
          notNull: {msg : `Le nom est une propriété requises `}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: `Utilisez uniquement des nombres entiers pour les points de vie.`},
          notNull: {msg : `Les points de vie sont des propriétés requises `},
          max:{
            args:[999],
            msg: `Les points de vie doivent être des entiers inférieurs ou égal à 999`
          },
          min:{
            args:[0],
            msg: `Les points de vie doivent être des entiers supérieurs ou égal à 0`
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: `Utilisez uniquement des nombres entiers pour les dégâts.`},
          notNull: {msg : `Les dégâts sont des propriétés requises `},
          max:{
            args:[99],
            msg: `Les points de vie doivent être des entiers inférieurs ou égal à 99`
          },
          min:{
            args:[0],
            msg: `Les points de vie doivent être des entiers supérieurs ou égal à 0`
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: `L'URL n'est pas valide`},
          notNull: {msg : `Les images sont des propriétés requises `}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate:{
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokemon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokemon ne peut pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!ValidTypes.includes(type)){
                throw new Error (`Le type d'un pokemon doit appartenir à la liste suivante : ${ValidTypes} `)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }