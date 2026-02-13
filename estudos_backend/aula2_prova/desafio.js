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

// CREATE DATABASE estoque_db;
// USE estoque_db;

// CREATE TABLE produtos(
// 	id INT primary key auto_increment,
//     nome Varchar(150) Not NULL,
//     categoria varchar(80) not null,
//     valor_unitario decimal(10,2) not null,
//     estoque_minimo int not null default 0,
//     estoque_maximo int not null default 0,
//     created_at timestamp default current_timestamp
// ); 

// CREATE TABLE movimentacoes(
// 	id INT primary key auto_increment,
// 	produto_id int not null,
//     tipo ENUM('ENTRADA', 'SAIDA') NOT NULL,
//     quantidade int not null, 
//     data_movimentacao datetime not null default current_timestamp,
//     created_at timestamp default current_timestamp,
//     CONSTRAINT fk_movimentacoes_produtos
// 		FOREIGN KEY (produto_id) REFERENCES produtos(id)
//         ON UPDATE CASCADE
//         ON DELETE RESTRICT
// );

// -- Populando três registros

// INSERT INTO produtos
// (nome, categoria, valor_unitario, estoque_minimo, estoque_maximo)
// VALUES
// ('Esponja', 'Utensilio', 6.99, 10, 40),
// ('CIF', 'Produto Quimico', 12.50, 8, 10),
// ('Detergente', 'Produto Quimico', 5.50, 6, 20);

// INSERT INTO movimentacoes
// (produto_id, tipo, quantidade, data_movimentacao)
// VALUES
// (1, 'ENTRADA', 10, '2026-01-03 09:00:00'),
// (1, 'SAIDA', 3, '2026-01-10 15:10:00'),
// (1, 'SAIDA', 2, '2026-01-15 11:30:00'),
// (2, 'ENTRADA', 8, '2026-01-04 10:00:00'),
// (2, 'SAIDA', 4, '2026-01-17 16:00:00'),
// (3, 'ENTRADA', 6, '2026-01-05 08:30:00'),
// (3, 'SAIDA', 1, '2026-01-20 13:15:00');
