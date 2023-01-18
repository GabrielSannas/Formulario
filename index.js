const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/pergunta");
const Resposta = require("./database/Resposta");
//database

connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com o banco de dados!")
    })
    .catch((msgerro) => {
        console.log(msgerro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Rotas
app.get("/",(req, res) => {
    pergunta.findAll({ raw: true, order:[
    ['id','DESC'] // ASC = crescente , DESC = decrescente
    ]}).then(perguntas => {
        res.render("index", {
           perguntas: perguntas
        });   
    });
}); 

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});


app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
       if(pergunta != undefined){ // pergunta encontrada
            res.render("pergunta", {
                pergunta: pergunta
            });
       }else{ //não encontrada
            res.redirect("/");
       } 

    });

});

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta; 
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);    
    });
});    

app.listen(8080,()=>{console.log("App rodando!");});