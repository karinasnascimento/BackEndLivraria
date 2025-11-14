// GET    /favoritos
// POST   /favoritos
// DELETE /favoritos/:id

import { 
    criarFavorito, 
    obterFavorito, 
    listarFavoritos,
    deletarFavorito} from "../controllers/favoritos.controller.js";

import express from "express";
//const express = require "express"; tem a mesma função do de cima

//Tranformando todas as funções criadas em uma rota
const router = express.Router();

router.get("/", listarFavoritos);
router.post("/", criarFavorito);
router.get("/:id", obterFavorito);
router.delete("/:id", deletarFavorito);

export default router; //apelidado no controller de "livrosRouter"