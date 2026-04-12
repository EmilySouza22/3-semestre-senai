import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3000/posts')
			.then((res) => {
				if (!res.ok) throw new Error('Falha ao carregar posts');
				return res.json();
			})
			.then((data) => {
				setPosts(data);
			})
			.catch(() => {
				setError(
					'Erro ao carregar posts. Verifique se o JSON server está rodando em http://localhost:3000',
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Carregando posts...</div>;
	if (error) return <div>{error}</div>;
	if (!posts.length) return <div>Nenhum post encontrado.</div>;

	return (
		<>
			<div className="flex gap-2">
				{posts.map((post) => (
					<div key={post.id} className="card">
						<img src={post.image} alt={post.title} />
						<h2>{post.title}</h2>
						<h3>{post.views}</h3>
						<p>{post.description}</p>
						<Link
							to={`/post/${post.id}`}
							className="text-blue-50 bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
						>
							Leia Mais
						</Link>
					</div>
				))}
			</div>
		</>
	);
};

export default Blog;
