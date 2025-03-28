import styles from './page.module.css';
import Main from '@/components/Main';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h1>Control Iglesia</h1>
				<Main />
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
