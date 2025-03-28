'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Consolidado() {
	const [ingresos, setIngresos] = useState([]);
	const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');
	const [consolidado, setConsolidado] = useState({});

	useEffect(() => {
		async function fetchIngresos() {
			try {
				const response = await fetch('/api/finanzas/getFinanzas');
				if (!response.ok) throw new Error('Error al obtener los datos');

				const data = await response.json();
				setIngresos(data);
				calcularConsolidado(data);
			} catch (error) {
				console.error('Error al obtener ingresos:', error);
			}
		}

		fetchIngresos();
	}, []);

	const calcularConsolidado = (data) => {
		const resultado = {};

		data.forEach(({ cantidad, moneda, tipo, fecha }) => {
			const date = new Date(fecha).toISOString().split('T')[0];

			if (
				(fechaInicio === '' || date >= fechaInicio) &&
				(fechaFin === '' || date <= fechaFin)
			) {
				const clave = `${moneda}-${tipo}`;
				if (!resultado[clave]) resultado[clave] = 0;
				resultado[clave] += cantidad;
			}
		});

		setConsolidado(resultado);
	};

	const handleFiltrar = () => {
		calcularConsolidado(ingresos);
	};

	return (
		<div className={styles.container}>
			<h2>Consolidado de Ingresos</h2>

			<div className={styles.filtros}>
				<label>Fecha Inicio:</label>
				<input
					type='date'
					value={fechaInicio}
					onChange={(e) => setFechaInicio(e.target.value)}
				/>

				<label>Fecha Fin:</label>
				<input
					type='date'
					value={fechaFin}
					onChange={(e) => setFechaFin(e.target.value)}
				/>

				<button onClick={handleFiltrar}>Filtrar</button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>Moneda</th>
						<th>Tipo</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(consolidado).map(([key, total]) => {
						const [moneda, tipo] = key.split('-');
						return (
							<tr key={key}>
								<td>{moneda}</td>
								<td>{tipo}</td>
								<td>{total.toFixed(2)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
