'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function DonacionesPage() {
	const [donaciones, setDonaciones] = useState([]);

	useEffect(() => {
		async function fetchDonaciones() {
			try {
				const response = await fetch('/api/donaciones/getDonaciones');
				if (!response.ok) throw new Error('Error al obtener las donaciones');

				const data = await response.json();
				setDonaciones(data);
			} catch (error) {
				console.error('Error al obtener donaciones:', error);
			}
		}

		fetchDonaciones();
	}, []);

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`/api/donaciones/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw new Error('Error al eliminar la donación');

			setDonaciones(donaciones.filter((donacion) => donacion.id !== id));
			alert('Donación eliminada correctamente');
		} catch (error) {
			console.error('Error al eliminar donación:', error);
			alert('Error al eliminar donación');
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Lista de Donaciones</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.th}>Artículo</th>
						<th className={styles.th}>Cantidad</th>
						<th className={styles.th}>Fecha</th>
						<th className={styles.th}>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{donaciones.map(({ id, articulo, cantidad, fecha }) => (
						<tr key={id}>
							<td className={styles.td}>{articulo}</td>
							<td className={styles.td}>{cantidad}</td>
							<td className={styles.td}>
								{new Date(fecha).toLocaleDateString()}
							</td>
							<td className={styles.td}>
								<button
									className={styles.deleteButton}
									onClick={() => handleDelete(id)}
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.buttonContainer}>
				<Link
					href='/donaciones/addDonacion'
					className={styles.addDonationButton}
				>
					Agregar Donación
				</Link>
				<Link
					href='/donaciones/consolidadoDonaciones'
					className={styles.consolidadoButton}
				>
					Ver Consolidado
				</Link>
			</div>
		</div>
	);
}
