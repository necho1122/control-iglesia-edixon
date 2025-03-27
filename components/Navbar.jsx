'use client';

import { useState } from 'react';
import { GodIcon, BarsIcon, ConfigIcon } from './Icons';
import styles from './Navbar.module.css';

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
					<button className={styles.logout}>Logout</button>
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
			<li>Home</li>
			<li>Donaciones</li>
			<li>Finanzas</li>
			<li>Usuarios</li>
			<li>
				<ConfigIcon />
			</li>
		</ul>
	);
}
