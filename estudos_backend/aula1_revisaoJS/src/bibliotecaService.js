import { pool } from './config.js';

//Buscar um livro específico
export async function buscarLivroPorId(IdLivro){
    const [rows] = await pool.query("SELECT * from livros WHERE id=?", 
        [IdLivro]
    )
    return rows[0]
}