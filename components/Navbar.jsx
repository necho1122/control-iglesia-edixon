'use client';

import { useState } from 'react';
import { GodIcon, BarsIcon, ConfigIcon } from './Icons';
import styles from './Navbar.module.css';
import Link from 'next/link';

function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className={styles.navbarContainer}>
			<nav className={styles.navbar}>
				<GodIcon />

				{/* Se oculta en móvil y se muestra con el estado */}
				<ListItem isVisible={menuOpen} />

				<div className={styles.right}>
					<button className={styles.logout}>Salir</button>
					<button
						className={styles.bars}
						onClick={toggleMenu}
					>
						<BarsIcon />
					</button>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;

function ListItem({ isVisible }) {
	return (
		<ul className={`${styles.menu} ${isVisible ? styles.menuOpen : ''}`}>
			<li>
				<Link
					href='/'
					onClick={() => setMenuOpen(false)}
				>
					Inicio
				</Link>
			</li>
			<li>
				<Link
					href='/donaciones'
					onClick={() => setMenuOpen(false)}
				>
					Donaciones
				</Link>
			</li>
			<li>
				<Link
					href='/finanzas'
					onClick={() => setMenuOpen(false)}
				>
					Finanzas
				</Link>
			</li>
			<li>
				<Link
					href='/usuarios'
					onClick={() => setMenuOpen(false)}
				>
					Usuarios
				</Link>
			</li>
			<li>
				<Link
					href='/configuracion'
					onClick={() => setMenuOpen(false)}
				>
					<ConfigIcon />
				</Link>
			</li>
		</ul>
	);
}
