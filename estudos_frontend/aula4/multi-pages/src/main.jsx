import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { AuthProvider } from './context/AuthContext';
import { Main } from './layouts/Main';
import { Login } from './pages/Login';
import Blog from './pages/Blog';
import { Authors } from './pages/Author';
import AuthorsDetail from './pages/Author/AuthorDetail';
import PostDetail from './pages/Blog/PostDetail';

export const router = createBrowserRouter([
	{
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'sobre',
				element: <Sobre />,
			},
			{
				path: 'blog',
				element: <Blog />,
			},
			{
				path: 'autores',
				element: <Authors />,
			},
			{
				path: 'post/:id',
				element: <PostDetail />,
			},
			{
				path: 'autores/:id',
				element: <AuthorsDetail />,
			},
		],
	},
	{
		path: 'login',
		element: <Login />,
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
		{/* <App /> */}
	</StrictMode>,
);
