import { pool } from './config.js';

// listar o valor total por item que tenho no estoque, considerando quant e valor_unitario
export async function listarValorTotalProdutos() {
	const [rows] = await pool.query(
		`SELECT 
            p.nome AS produto,
            SUM(
                CASE 
                    WHEN m.tipo = 'ENTRADA' THEN m.quantidade
                    WHEN m.tipo = 'SAIDA' THEN -m.quantidade
                END
            ) AS quantidade_total,
            SUM(
                CASE 
                    WHEN m.tipo = 'ENTRADA' THEN m.quantidade
                    WHEN m.tipo = 'SAIDA' THEN -m.quantidade
                END
            ) * p.valor_unitario AS valor_total
        FROM produtos p
        JOIN movimentacoes m ON p.id = m.produto_id
        GROUP BY p.id`,
	);
	return rows;
}

// consultar e RETORNAR todos os produtos cadastrados
export async function consultarProdutos() {
	const [rows] = await pool.query('SELECT * FROM produtos');
	return [rows];
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
		`SELECT 
            p.nome AS produto,
            SUM(m.quantidade) AS quantidade_total_saida,
            SUM(m.quantidade * p.valor_unitario) AS valor_total_financeiro_saidas
        FROM movimentacoes m
        INNER JOIN produtos p ON p.id = m.produto_id
        WHERE m.tipo = 'SAIDA'
        AND m.data_movimentacao BETWEEN ? AND ?
        GROUP BY p.id
        ORDER BY quantidade_total_saida DESC`,
		[dataInicial, dataFinal],
	);
    return rows;
}

//identificar produtos que tenham atingido os limites minimo e maximo estabelecidos para o estoque.
