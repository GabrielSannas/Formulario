const Sequelize = require("Sequelize");
const connection = require("./database");

const Pergunta = connection.define("pergunta",{
    titulo:{   
       type: Sequelize.STRING,
       allownull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allownull: false
    }
});

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;