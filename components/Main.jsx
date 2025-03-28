import styles from './Main.module.css';
import GraphFinanzas from './GraphFinanzas';
import Donation from './Donation';

function Main() {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.mainItem}>
				<GraphFinanzas />
			</div>
			<div className={styles.mainItem}>
				<Donation />
			</div>
		</div>
	);
}

export default Main;
