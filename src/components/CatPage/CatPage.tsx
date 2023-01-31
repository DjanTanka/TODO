import { FC } from 'react';
import cat from '../../assets/cat.svg';
import styles from './CatPage.module.scss';

export const CatPage: FC = () => {
	return (
		<div className={styles.container}>
			<img src={cat} alt='cat'></img>
			<p>I want tasks...</p>
			<p className={styles.meow}>meow</p>
			<p className={styles.meow1}>meow</p>
			<p className={styles.meow2}>Meow</p>
		</div>
	);
};
