import { 
    criarUsuario, 
    obterUsuario, 
    listaUsuario, 
    atualizaUsuario, 
    deletarUsuario } from "../controllers/usuarios.controller.js";

import express from "express";
//const express = require "express"; tem a mesma função do de cima

//Tranformando todas as funções criadas em uma rota
const router = express.Router();

router.get("/", listaUsuario);
router.post("/", criarUsuario);
router.get("/:id", obterUsuario);
router.put("/:id", atualizaUsuario);
router.delete("/:id", deletarUsuario);

export default router; //apelidado no controller de "usuariosRouter"