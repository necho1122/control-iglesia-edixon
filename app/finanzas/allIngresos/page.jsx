'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function EliminarIngreso() {
	const [ingresos, setIngresos] = useState([]);

	useEffect(() => {
		async function fetchIngresos() {
			try {
				const response = await fetch('/api/finanzas/getFinanzas');
				if (!response.ok) throw new Error('Error al obtener los ingresos');

				const data = await response.json();
				setIngresos(data);
			} catch (error) {
				console.error('Error al obtener ingresos:', error);
			}
		}

		fetchIngresos();
	}, []);

	const eliminarIngreso = async (id) => {
		if (!confirm('¿Estás seguro de eliminar este ingreso?')) return;

		try {
			const response = await fetch(`/api/finanzas/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw new Error('Error al eliminar ingreso');

			setIngresos(ingresos.filter((ingreso) => ingreso.id !== id));
			alert('Ingreso eliminado correctamente');
		} catch (error) {
			console.error('Error al eliminar:', error);
			alert('Error al eliminar ingreso');
		}
	};

	return (
		<div className={styles.container}>
			<h2>Todos los ingresos</h2>
			<ul className={styles.list}>
				{ingresos.map(({ id, descripcion, cantidad, moneda, fecha }) => (
					<li key={id}>
						{descripcion} - {cantidad} {moneda} -{' '}
						{new Date(fecha).toLocaleDateString()}
						<button
							onClick={() => eliminarIngreso(id)}
							className={styles.deleteBtn}
						>
							Eliminar
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
