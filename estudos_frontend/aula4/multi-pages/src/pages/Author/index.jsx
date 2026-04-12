import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Authors = () => {
	const [autores, setAutores] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3000/autores')
			.then((res) => {
				if (!res.ok) throw new Error('Falha ao carregar autores');
				return res.json();
			})
			.then((data) => {
				setAutores(data);
			})
			.catch(() => {
				setError(
					'Erro ao carregar autores. Verifique se o JSON server está rodando em http://localhost:3000',
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Carregando autores...</div>;
	if (error) return <div>{error}</div>;
	if (!autores.length) return <div>Nenhum autor encontrado.</div>;

	return (
		<div className={`flex gap-2 py-5 flex-wrap`}>
			{autores.map((autores) => (
				<div key={autores.id} className="card-author">
					<img src={autores.foto} alt={autores.nome} />
					<h2 className="text-xl">{autores.nome}</h2>
					<p>{autores.descricao}</p>
					<Link
						to={`/autores/${autores.id}`}
						className="text-blue-50 bg-blue-500 hover:bg-blue-700"
					>
						Saiba mais
					</Link>
				</div>
			))}
		</div>
	);
};
