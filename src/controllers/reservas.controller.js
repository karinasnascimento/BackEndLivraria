// listarReservas → retorna todas as reservas cadastradas (com dados do usuário e livro)
// criarReserva → insere uma nova reserva no banco
// excluirReserva → exclui uma reserva pelo ID
// Valide se o livro está ativo antes de permitir reserva -> PATCH: editar especificamente

//await: Faz com que o código execute linha por linha, ao invés de executar tudo de uma vez

import { db } from "../config/db.js";

/**
 * Calcula a data de devolução adicionando um número de dias à data de retirada.
 * @param {Date} dataRetirada - O objeto Date da data de retirada.
 * @param {number} diasPrazo - O número de dias do prazo de empréstimo.
 * @returns {Date} O objeto Date da data de devolução.
 */

function calcularDevolucao(dataRetirada, diasPrazo) {
    // 1. Cria uma nova data para evitar modificar o objeto original
    const dataDevolucao = new Date(dataRetirada);
    
    // 2. Adiciona o número de dias. O JS recalcula mês/ano.
    dataDevolucao.setDate(dataDevolucao.getDate() + diasPrazo);
    
    return dataDevolucao;
}

// Função auxiliar para formatar Date para a string 'YYYY-MM-DD' que o MySQL/PostgreSQL espera
function formatarDataParaDB(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

export async function criarReserva(req, res) {
    const prazo_padrao = 20;

    try {
        const { usuario_id, livro_id, data_retirada, confirmado_email } = req.body;
        if (!usuario_id || !livro_id || !data_retirada || !confirmado_email)
            return res.status(400).json({ erro: "Campos obrigatórios" });
       
        // Cria o objeto Date a partir da string do body
        const dataRetiradaObjeto = new Date(data_retirada);
        dataRetiradaObjeto.setHours(0, 0, 0, 0); // Zera o horário para garantir o início do dia local
        // Calcula a data de devolução com o o. Date
        const dataDevolucaoObjeto = calcularDevolucao(dataRetiradaObjeto, prazo_padrao);
        // Formata a data de devolução para string 'YYYY-MM-DD' para o DB
        const dataDevolucaoFormatada = formatarDataParaDB(dataDevolucaoObjeto);

        // Verificando se o livro está ativo
        const [resultado] = await db.execute("SELECT ativo FROM livros WHERE id = ?",[livro_id])

        if (resultado[0].ativo === 1) {
            await db.execute(
                "INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao, confirmado_email) VALUES (?, ?, ?, ?, ?)",
                [usuario_id, livro_id, data_retirada, dataDevolucaoFormatada, confirmado_email]
            );
        }else{
             return res.status(404).json({ msg: "Livro não disponivel" });
        }

        res.json({ mensagem: "Reserva criada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function listarReservas(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM reservas");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function obterReserva(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM reservas WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ erro: "Reserva não encontrada" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function deletarReserva(req, res) {
    try {
        await db.execute("DELETE FROM reservas WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Reserva deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};