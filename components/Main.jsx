import styles from './Main.module.css';

function Main() {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.mainItem}>exposicion de finanzas</div>
			<div className={styles.mainItem}>exposicion de donaciones</div>
		</div>
	);
}

export default Main;
