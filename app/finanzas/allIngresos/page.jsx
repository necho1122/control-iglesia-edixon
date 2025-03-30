'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AllIngresos() {
	const [ingresos, setIngresos] = useState([]);
	const [sortedIngresos, setSortedIngresos] = useState([]);

	useEffect(() => {
		async function fetchIngresos() {
			try {
				const response = await fetch('/api/finanzas/getFinanzas');
				if (!response.ok) throw new Error('Error al obtener los ingresos');

				const data = await response.json();
				setIngresos(data);
				sortByDate(data);
			} catch (error) {
				console.error('Error al obtener ingresos:', error);
			}
		}

		fetchIngresos();
	}, []);

	const sortByDate = (data) => {
		const sorted = [...data].sort(
			(a, b) => new Date(b.fecha) - new Date(a.fecha)
		);
		setSortedIngresos(sorted);
	};

	const eliminarIngreso = async (id) => {
		if (!confirm('¿Estás seguro de eliminar este ingreso?')) return;

		try {
			const response = await fetch(`/api/finanzas/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw new Error('Error al eliminar ingreso');

			const updatedIngresos = ingresos.filter((ingreso) => ingreso.id !== id);
			setIngresos(updatedIngresos);
			sortByDate(updatedIngresos);
			alert('Ingreso eliminado correctamente');
		} catch (error) {
			console.error('Error al eliminar:', error);
			alert('Error al eliminar ingreso');
		}
	};

	return (
		<div className={styles.container}>
			<h4>Todos los Ingresos</h4>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Moneda</th>
						<th>Tipo</th>
						<th>Cantidad</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{sortedIngresos.map(({ id, fecha, moneda, tipo, cantidad }) => (
						<tr key={id}>
							<td>{new Date(fecha).toLocaleDateString()}</td>
							<td>{moneda}</td>
							<td>{tipo}</td>
							<td>{cantidad.toFixed(2)}</td>
							<td>
								<button
									onClick={() => eliminarIngreso(id)}
									className={styles.deleteBtn}
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
