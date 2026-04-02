CREATE DATABASE estoque_db;
USE estoque_db;

CREATE TABLE produtos(
	id INT primary key auto_increment,
    nome Varchar(150) Not NULL,
    categoria varchar(80) not null,
    valor_unitario decimal(10,2) not null,
    estoque_minimo int not null default 0,
    estoque_maximo int not null default 0,
    created_at timestamp default current_timestamp
); 

CREATE TABLE movimentacoes(
	id INT primary key auto_increment,
	produto_id int not null,
    tipo ENUM('ENTRADA', 'SAIDA') NOT NULL,
    quantidade int not null, 
    data_movimentacao datetime not null default current_timestamp,
    created_at timestamp default current_timestamp,
    CONSTRAINT fk_movimentacoes_produtos
		FOREIGN KEY (produto_id) REFERENCES produtos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- Populando três registros

INSERT INTO produtos
(nome, categoria, valor_unitario, estoque_minimo, estoque_maximo)
VALUES
('Esponja', 'Utensilio', 6.99, 10, 40),
('CIF', 'Produto Quimico', 12.50, 8, 10),
('Detergente', 'Produto Quimico', 5.50, 6, 20);

INSERT INTO movimentacoes
(produto_id, tipo, quantidade, data_movimentacao)
VALUES
(1, 'ENTRADA', 10, '2026-01-03 09:00:00'),
(1, 'SAIDA', 3, '2026-01-10 15:10:00'),
(1, 'SAIDA', 2, '2026-01-15 11:30:00'),
(2, 'ENTRADA', 8, '2026-01-04 10:00:00'),
(2, 'SAIDA', 4, '2026-01-17 16:00:00'),
(3, 'ENTRADA', 6, '2026-01-05 08:30:00'),
(3, 'SAIDA', 1, '2026-01-20 13:15:00');
