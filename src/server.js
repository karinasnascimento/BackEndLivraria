// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usuariosRouter from "./routes/usuarios.routes.js";
import livrosRouter from "./routes/livros.routes.js";
import avaliacoesRouter from "./routes/avaliacoes.routes.js";

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) =>{
  res.send("API funcionando");
});

//Importar 
app.use("/usuarios", usuariosRouter);
app.use("/livros", livrosRouter);
app.use("/avaliacoes", avaliacoesRouter);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));