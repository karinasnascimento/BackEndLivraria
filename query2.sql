SELECT * FROM favoritos;

SELECT f.id, u.nome, l.titulo, f.data_favoritado FROM favoritos f
INNER JOIN usuarios u
ON f.usuario_id = u.id
INNER JOIN livros l
ON f.livro_id = l.id;



SELECT ativo FROM livros WHERE id = 1