// listarFavoritos → retorna todos os livros favoritados por cada usuário
// criarFavorito → adiciona um livro aos favoritos do usuário
// excluirFavorito → remove um livro dos favoritos

import { db } from "../config/db.js";

export async function criarFavorito(req, res) {
    try {
        const { usuario_id, livro_id } = req.body;
        if (!usuario_id || !livro_id)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            "INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)",
            [usuario_id, livro_id]
        );

        res.json({ mensagem: "Livro favoritado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function listarFavoritos(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM favoritos");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function obterFavorito(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM favoritos WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ erro: "Favorito não encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function deletarFavorito(req, res) {
    try {
        await db.execute("DELETE FROM favoritos WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Remoção do favorito com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};