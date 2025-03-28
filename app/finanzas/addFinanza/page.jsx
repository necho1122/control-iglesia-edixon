'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase'; // Asegúrate de importar correctamente tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import styles from './page.module.css';

export default function IngresoForm() {
	const [cantidad, setCantidad] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [moneda, setMoneda] = useState('USD');
	const [tipo, setTipo] = useState('efectivo');
	const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addDoc(collection(db, 'ingresos'), {
				cantidad: parseFloat(cantidad),
				descripcion,
				moneda,
				tipo,
				fecha: new Date(fecha).toISOString(),
			});

			setCantidad('');
			setDescripcion('');
			setMoneda('USD');
			setTipo('efectivo');
			setFecha(new Date().toISOString().split('T')[0]);

			alert('Ingreso agregado correctamente');
		} catch (error) {
			console.error('Error al agregar ingreso:', error);
			alert('Error al agregar ingreso');
		}
	};

	return (
		<div className={styles.formContainer}>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<h2>Agregar Ingreso</h2>
				<div className={styles.field}>
					<label>Cantidad:</label>
					<input
						type='number'
						value={cantidad}
						onChange={(e) => setCantidad(e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label>Descripción:</label>
					<input
						type='text'
						value={descripcion}
						onChange={(e) => setDescripcion(e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label>Moneda:</label>
					<select
						value={moneda}
						onChange={(e) => setMoneda(e.target.value)}
					>
						<option value='USD'>USD</option>
						<option value='VES'>VES</option>
					</select>
				</div>

				<div className={styles.field}>
					<label>Tipo:</label>
					<select
						value={tipo}
						onChange={(e) => setTipo(e.target.value)}
					>
						<option value='efectivo'>Efectivo</option>
						<option value='transferencia'>Transferencia</option>
					</select>
				</div>

				<div className={styles.field}>
					<label>Fecha:</label>
					<input
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
					Agregar Ingreso
				</button>
			</form>
		</div>
	);
}
