import Image from 'next/image';
import styles from './Donation.module.css';
import Link from 'next/link';

function Donation() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Donaciones</h1>
			<Image
				src='/donation.png'
				width={250}
				height={250}
				alt='donation'
			/>
			<div className={styles.links}>
				<Link href='/donaciones'>Ver donaciones</Link>
				<Link href='/donaciones/addDonacion'>Agregar donación</Link>
			</div>
		</div>
	);
}

export default Donation;
