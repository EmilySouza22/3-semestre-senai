import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/posts')
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
			});
	}, []);
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
