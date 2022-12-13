const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./databae/database")
//database

connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com o banco de dados")
    })
    .cath((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Rotas
app.get("/",(req, res) => {
    res.render("index");
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! titulo " + titulo + " " + " descricao " + descricao);
});


app.listen(8080,()=>{console.log("App rodando!");});