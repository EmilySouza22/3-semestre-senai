import { buscarLivroPorId, cadastrarLivro } from "./bibliotecaService.js";;
import { pool } from './config.js';

async function main() {
    console.log(await buscarLivroPorId(1))

    console.log(`Cadastrando livro...`, await cadastrarLivro('Livro 1', 'Terror', 10.5, 5, 10))


}

main().catch(error => 
    console.error(error)
).finally(async () => {
    await pool.end()
});