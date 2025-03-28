'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Consolidado() {
	const [ingresos, setIngresos] = useState([]);
	const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');
	const [consolidado, setConsolidado] = useState({
		VES: { efectivo: 0, transferencia: 0 },
		USD: { efectivo: 0 },
	});

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
		const resultado = {
			VES: { efectivo: 0, transferencia: 0 },
			USD: { efectivo: 0 },
		};

		data.forEach(({ cantidad, moneda, tipo, fecha }) => {
			const date = new Date(fecha).toISOString().split('T')[0];

			if (
				(fechaInicio === '' || date >= fechaInicio) &&
				(fechaFin === '' || date <= fechaFin)
			) {
				if (moneda === 'VES') {
					if (tipo === 'efectivo') {
						resultado.VES.efectivo += cantidad;
					} else if (tipo === 'transferencia') {
						resultado.VES.transferencia += cantidad;
					}
				} else if (moneda === 'USD' && tipo === 'efectivo') {
					resultado.USD.efectivo += cantidad;
				}
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
				<div>
					<label>Desde:</label>
					<input
						type='date'
						value={fechaInicio}
						onChange={(e) => setFechaInicio(e.target.value)}
					/>
				</div>

				<div>
					<label>Hasta:</label>
					<input
						type='date'
						value={fechaFin}
						onChange={(e) => setFechaFin(e.target.value)}
					/>
				</div>

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
					{/* Mostrar los valores de VES */}
					<tr>
						<td>VES</td>
						<td>efectivo</td>
						<td>{consolidado.VES.efectivo.toFixed(2)}</td>
					</tr>
					<tr>
						<td>VES</td>
						<td>transferencia</td>
						<td>{consolidado.VES.transferencia.toFixed(2)}</td>
					</tr>

					{/* Mostrar los valores de USD solo en efectivo */}
					<tr>
						<td>USD</td>
						<td>efectivo</td>
						<td>{consolidado.USD.efectivo.toFixed(2)}</td>
					</tr>
				</tbody>
			</table>

			<Link href='/finanzas/addFinanza'>Agregar Ingreso</Link>
		</div>
	);
}
