'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function ConfiguracionPage() {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Configuración</h2>
			<div className={styles.grid}>
				<Link
					href='/configuracion/articulos'
					className={styles.button}
				>
					Gestionar Artículos
				</Link>
				<Link
					href='/configuracion'
					className={styles.button}
				>
					Gestionar Usuarios
				</Link>
				<Link
					href='/configuracion'
					className={styles.button}
				>
					Gestionar Roles
				</Link>
				<Link
					href='/configuracion'
					className={styles.button}
				>
					Gestionar Permisos
				</Link>
				<Link
					href='/configuracion'
					className={styles.button}
				>
					Ajustes Generales
				</Link>
			</div>
		</div>
	);
}
