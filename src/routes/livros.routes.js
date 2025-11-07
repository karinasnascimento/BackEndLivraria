// GET     /livros (lista/mostra) 
// GET     /livros/:id (mostra por id)
// POST    /livros (cria)
// PUT     /livros/:id (atualiza)
// DELETE  /livros/:id (deleta)

import { 
    criarLivro, 
    obterLivro, 
    listarLivros, 
    atualizarLivro, 
    deletarLivro } from "../controllers/livros.controller.js";

import express from "express";
//const express = require "express"; tem a mesma função do de cima

//Tranformando todas as funções criadas em uma rota
const router = express.Router();

router.get("/", listarLivros);
router.post("/", criarLivro);
router.get("/:id", obterLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);

export default router; //apelidado no controller de "livrosRouter"