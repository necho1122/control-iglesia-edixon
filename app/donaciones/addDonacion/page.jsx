'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AddDonacionPage() {
	const [articulo, setArticulo] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
	const [articulos, setArticulos] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/donaciones/addDonacion', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ articulo, cantidad: parseInt(cantidad), fecha }),
			});

			if (!response.ok) throw new Error('Error al agregar la donación');

			setArticulo('');
			setCantidad('');
			setFecha(new Date().toISOString().split('T')[0]);

			alert('Donación agregada correctamente');
		} catch (error) {
			console.error('Error al agregar donación:', error);
			alert('Error al agregar donación');
		}
	};

	useEffect(() => {
		async function fetchArticulos() {
			try {
				const response = await fetch('/api/donaciones/getArticulos');
				if (!response.ok) throw new Error('Error al obtener las donaciones');

				const data = await response.json();
				setArticulos(data);
			} catch (error) {
				console.error('Error al obtener donaciones:', error);
			}
		}

		fetchArticulos();
	}, []);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Agregar Donación</h2>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<div className={styles.field}>
					<label htmlFor='articulo'>Artículo:</label>
					<select
						id='articulo'
						value={articulo}
						onChange={(e) => setArticulo(e.target.value)}
						required
					>
						<option
							value=''
							disabled
						>
							Seleccione un artículo
						</option>
						{articulos.map((articulo) => (
							<option
								key={articulo.id}
								value={articulo.articulo}
							>
								{articulo.articulo}
							</option>
						))}
					</select>
				</div>
				<div className={styles.field}>
					<label htmlFor='cantidad'>Cantidad:</label>
					<input
						id='cantidad'
						type='number'
						value={cantidad}
						onChange={(e) => setCantidad(e.target.value)}
						required
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor='fecha'>Fecha:</label>
					<input
						id='fecha'
						type='date'
						value={fecha}
						onChange={(e) => setFecha(e.target.value)}
						required
					/>
				</div>
				<button
					className={styles.button}
					type='submit'
				>
					Agregar Donación
				</button>
			</form>
		</div>
	);
}
