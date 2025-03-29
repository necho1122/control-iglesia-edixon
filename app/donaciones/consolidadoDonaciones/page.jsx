'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ConsolidadoDonaciones() {
	const [consolidado, setConsolidado] = useState([]);

	useEffect(() => {
		async function fetchDonaciones() {
			try {
				const response = await fetch('/api/donaciones/getDonaciones');
				if (!response.ok) throw new Error('Error al obtener las donaciones');

				const data = await response.json();

				// Consolidate donations by summing quantities of the same article
				const consolidadoMap = data.reduce((acc, { articulo, cantidad }) => {
					if (!acc[articulo]) {
						acc[articulo] = 0;
					}
					acc[articulo] += cantidad;
					return acc;
				}, {});

				const consolidadoArray = Object.entries(consolidadoMap).map(
					([articulo, cantidad]) => ({ articulo, cantidad })
				);

				setConsolidado(consolidadoArray);
			} catch (error) {
				console.error('Error al obtener donaciones:', error);
			}
		}

		fetchDonaciones();
	}, []);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Consolidado de Donaciones</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.th}>Artículo</th>
						<th className={styles.th}>Cantidad Total</th>
					</tr>
				</thead>
				<tbody>
					{consolidado.map(({ articulo, cantidad }) => (
						<tr key={articulo}>
							<td className={styles.td}>{articulo}</td>
							<td className={styles.td}>{cantidad}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
