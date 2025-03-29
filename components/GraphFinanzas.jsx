'use client';

import { useState, useEffect } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import styles from './GraphFinanzas.module.css';
import Link from 'next/link';

export default function GraficaSemanal() {
	const [ingresos, setIngresos] = useState([]);
	const [tasaCambio, setTasaCambio] = useState(100);

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

	// Función para calcular ingresos semanales en USD y total disponible
	const calcularIngresosSemanales = () => {
		const hoy = new Date();
		const semanas = [0, 1, 2, 3].map((semana) => {
			const inicioSemana = new Date(hoy);
			inicioSemana.setDate(hoy.getDate() - hoy.getDay() - semana * 7); // Ajustar al domingo de cada semana
			const finSemana = new Date(inicioSemana);
			finSemana.setDate(inicioSemana.getDate() + 6);

			const ingresosSemana = ingresos
				.filter(({ fecha }) => {
					const fechaIngreso = new Date(fecha);
					return fechaIngreso >= inicioSemana && fechaIngreso <= finSemana;
				})
				.reduce((total, { cantidad, moneda }) => {
					const cantidadUSD =
						moneda === 'VES' ? cantidad / tasaCambio : cantidad;
					return total + cantidadUSD;
				}, 0);

			return { semana: `Semana ${4 - semana}`, ingresosUSD: ingresosSemana };
		});

		const totalDisponible = semanas.reduce(
			(total, { ingresosUSD }) => total + ingresosUSD,
			0
		);
		return { semanas: semanas.reverse(), totalDisponible };
	};

	const { semanas, totalDisponible } = calcularIngresosSemanales();

	return (
		<div className={styles.container}>
			<h5 className={styles.title}>Gráfica Semanal de Ingresos</h5>
			<div className={styles.tasaContainer}>
				<label
					htmlFor='tasaCambio'
					className={styles.label}
				>
					Tasa USD/VES:
				</label>
				<input
					type='number'
					id='tasaCambio'
					value={tasaCambio}
					onChange={(e) => setTasaCambio(parseFloat(e.target.value) || 0)}
					className={styles.input}
					placeholder='Tasa de cambio'
				/>
			</div>

			{/* Total disponible en USD */}
			<div className={styles.totalDisponible}>
				<h4>Total Disponible en USD:</h4>
				<span className={styles.valorTotal}>${totalDisponible.toFixed(2)}</span>
			</div>

			{/* Gráfico de barras */}
			<ResponsiveContainer
				width='100%'
				height={300}
			>
				<LineChart data={semanas}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='semana' />
					<YAxis />
					<Tooltip />
					<Line
						type='monotone'
						dataKey='ingresosUSD'
						stroke='#00bcd4'
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>

			<div className={styles.links}>
				<Link
					href='/finanzas'
					className={styles.link}
				>
					Ver detalles
				</Link>
				<Link
					href='/finanzas/addFinanza'
					className={styles.link}
				>
					Agregar Ingreso
				</Link>
			</div>
		</div>
	);
}
