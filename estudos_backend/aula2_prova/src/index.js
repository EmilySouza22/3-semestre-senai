import { cadastrarProduto, consultarProdutos, listarValorTotalProdutos, produtosMaiorSaidaNoPeriodo } from "./produtoService.js";
import { pool } from './config.js';

async function main() {
    console.log(await consultarProdutos())

    console.log(`Cadastrando produto...`, await cadastrarProduto('Bombril', 'Utensilio', 2.00, 5, 10))

    console.log(await listarValorTotalProdutos())

    const dataInicial = "2026-01-01 00:00:00";
    const dataFinal = "2026-12-31 23:59:59";
    console.log(await produtosMaiorSaidaNoPeriodo(dataInicial, dataFinal))
}

main().catch(error => 
    console.error(error)
).finally(async () => {
    await pool.end()
})
