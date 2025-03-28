import Image from 'next/image';
import styles from './Donation.module.css';

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
		</div>
	);
}

export default Donation;
