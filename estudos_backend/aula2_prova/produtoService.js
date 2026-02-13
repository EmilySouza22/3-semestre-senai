import { pool } from './config.js';

// listar o valor total por item que tenho no estoque, considerando quant e valor_unitario
export async function listarValorTotalProdutos(){
    const [rows] = await pool.query(
        `SELECT p.id AS produto_id,
        p.nome AS produto, 
        p.valor_unitario, 
        SUM(m.quantidade) AS quantidade_total,
        SUM((m.quantidade) * p.valor_unitario) AS valor_total
        FROM produtos p 
        JOIN movimentacoes m ON p.id = m.produto_id 
        WHERE m.tipo = 'SAIDA' 
        GROUP BY p.id`
    
    );
    return rows.map((item) => {
        const quantidade = item.quantidade_total;
        const valorUnitario = item.valor_unitario;
        return {
            produto: item.produto,
            quantidade_total: quantidade,
            valor_total: quantidade * valorUnitario
        }
    })
}

// consultar e RETORNAR todos os produtos cadastrados
export async function consultarProdutos(){
    const [rows] = await pool.query('SELECT * FROM produtos');
    return [rows]
}

// função de cadastrar produtos
export async function cadastrarProduto(
	nomeProduto,
	categoriaProduto,
	valorUnitarioProduto,
	estoqueMinProduto,
	estoqueMaxProduto,
) {
	const [result] = await pool.query(
		'INSERT INTO produtos (nome, categoria, valor_unitario, estoque_minimo, estoque_maximo) VALUES (?, ?, ?, ?, ?)',
		[
			nomeProduto,
	        categoriaProduto,
	        valorUnitarioProduto,
	        estoqueMinProduto,
	        estoqueMaxProduto,
		],
	);
	return result.insertId;
}

// consultar saídas de produtos, por ordem DECRESCENTE por data

// registrar entradas de itens no estoque

// gerar relatório contendo as movimentações de entrada e saída com base no periodo informado
// (data_inicial, data_final) PARA CADA ITEM
// deve conter: nome_do_produto, total_entradas, total_saidas, saldo_no_periodo, valor_total_financeiro_das_entradas, valor_total_financeiro_das_saidas


// receber uma data_inicial e uma data_final, retornar os produtos com MAIOR VOLUME de SAÍDA no período
// contendo: nome_produto, quantidade_total_de_saida, valor_total_financeiro_das_saidas
export async function produtosMaiorSaidaNoPeriodo(dataInicial, dataFinal) {
	const [rows] = await pool.query(
		`SELECT p.id AS produto_id, 
        p.nome AS produto, 
        p.valor_unitario, 
        m.quantidade_total_saida 
        FROM produtos p
        LEFT JOIN 
        ( SELECT produto_id, SUM(quantidade) AS quantidade_total_saida 
         FROM movimentacoes 
         WHERE tipo = 'SAIDA' 
         AND data_movimentacao 
         BETWEEN ? AND ? 
         GROUP BY produto_id ) m ON m.produto_id = p.id 
         ORDER BY m.quantidade_total_saida DESC`,
		[dataInicial, dataFinal],
	);
	return rows.map((item) => {
        const quantidade = item.quantidade_total_saida;
        const valorUnitario = item.valor_unitario;
        return {
            produto: item.produto,
            quantidade_total_saida: quantidade,
            valor_total_financeiro_saidas: quantidade * valorUnitario
        }
    });
}

//identificar produtos que tenham atingido os limites minimo e maximo estabelecidos para o estoque.
