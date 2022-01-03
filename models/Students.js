const {Sequelize , DataTypes} = require('sequelize')
 const db = require('../db') 

const Students =  db.define('Students',{
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    degree:{
        type:DataTypes.STRING,
        allowNull:false
    }

})

module.exports = Students