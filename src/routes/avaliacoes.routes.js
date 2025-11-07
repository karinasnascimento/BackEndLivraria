// GET  /avaliacoes
// POST /avaliacoes

import { 
    listarAvaliacoes,
    criarAvaliacao,
    obterAvaliacao, 
    } from "../controllers/avaliacoes.controller.js";

import express from "express";
//const express = require "express"; tem a mesma função do de cima

//Tranformando todas as funções criadas em uma rota
const router = express.Router();

router.get("/", listarAvaliacoes);
router.post("/", criarAvaliacao);
router.get("/:id", obterAvaliacao);

export default router; //apelidado no controller de "livrosRouter"