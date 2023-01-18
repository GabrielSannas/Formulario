const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','0145',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;