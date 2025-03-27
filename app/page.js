import styles from './page.module.css';
import Navbar from '@/components/Navbar';

export default function Home() {
	return (
		<div className={styles.page}>
			<Navbar />
			<main className={styles.main}>
				<h1>Control Iglesia</h1>
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
