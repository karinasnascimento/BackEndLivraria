// GET    /reservas
// POST   /reservas
// DELETE /reservas/:id

import { deletarLivro } from "../controllers/livros.controller.js";
import { 
    criarReserva, 
    obterReserva, 
    listarReservas,
    deletarReserva} from "../controllers/reservas.controller.js";

import express from "express";
//const express = require "express"; tem a mesma função do de cima

//Tranformando todas as funções criadas em uma rota
const router = express.Router();

router.get("/", listarReservas);
router.post("/", criarReserva);
router.get("/:id", obterReserva);
router.delete("/:id", deletarReserva);

export default router; //apelidado no controller de "livrosRouter"