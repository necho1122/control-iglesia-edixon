'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AddArticuloPage() {
	const [articulo, setArticulo] = useState('');
	const [articulos, setArticulos] = useState([]);

	useEffect(() => {
		async function fetchArticulos() {
			try {
				const response = await fetch('/api/donaciones/getArticulos');
				if (!response.ok) throw new Error('Error al obtener los artículos');

				const data = await response.json();
				setArticulos(data);
			} catch (error) {
				console.error('Error al obtener artículos:', error);
			}
		}

		fetchArticulos();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/donaciones/addArticulo', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ articulo }),
			});

			if (!response.ok) throw new Error('Error al agregar el artículo');

			setArticulos([...articulos, { articulo }]);
			setArticulo('');
			alert('Artículo agregado correctamente');
		} catch (error) {
			console.error('Error al agregar artículo:', error);
			alert('Error al agregar artículo');
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Agregar Artículo</h2>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<div className={styles.field}>
					<label htmlFor='articulo'>Artículo:</label>
					<input
						id='articulo'
						type='text'
						value={articulo}
						onChange={(e) => setArticulo(e.target.value)}
						required
					/>
				</div>
				<button
					className={styles.button}
					type='submit'
				>
					Agregar Artículo
				</button>
			</form>
			<h3 className={styles.subtitle}>Lista de Artículos</h3>
			<ul className={styles.list}>
				{articulos.map((item, index) => (
					<li
						key={index}
						className={styles.listItem}
					>
						{item.articulo}
					</li>
				))}
			</ul>
		</div>
	);
}
