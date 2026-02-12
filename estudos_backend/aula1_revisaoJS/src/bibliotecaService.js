import { pool } from './config.js';

//Buscar um livro específico
export async function buscarLivroPorId(IdLivro){
    const [rows] = await pool.query("SELECT * from livros WHERE id=?", 
        [IdLivro]
    )
    return rows[0]
}

//Cadastrar um livro na biblioteca
export async function cadastrarLivro(
    tituloLivro, 
    categoriaLivro, 
    valorUnitarioLivro, 
    estoqueMinLivro, 
    estoqueMaxLivro
) {
    const [result] = await pool.query("INSERT INTO livros (titulo, categoria, valor_unitario, estoque_minimo, estoque_maximo) VALUES (?, ?, ?, ?, ?)", 
        [tituloLivro, categoriaLivro, valorUnitarioLivro, estoqueMinLivro, estoqueMaxLivro]
    )
    return result.insertId
}