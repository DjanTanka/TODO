import { FC } from 'react';
import { useStore } from 'context/store';
import { Switch } from 'components/Switch/Switch';
import logo from '../../assets/close.svg';
import { findColor } from 'utils';
import { markColor } from 'consts';
import styles from './TodoItem.module.scss';

export type TTodoItemProps = {
	id: number;
	task: string;
	isDone: boolean;
	handleChangeDone: (id: number, isDone: boolean) => void;
	handleDelete: (id: number) => void;
	index: number;
	isToday: boolean;
};

export const TodoItem: FC<TTodoItemProps> = ({ id, task, isDone, handleChangeDone, handleDelete, index, isToday }) => {
	const { news, settingNews } = useStore();
	return (
		<>
			<div key={id} className={styles.container}>
				<div
					style={{
						height: settingNews === 0 ? '50px' : '32px',
						width: '5%',
					}}
				>
					<div
						style={{
							width: '3px',
							borderRadius: '3px',
							backgroundColor: `${markColor[findColor(index)]}`,
							height: settingNews === 0 ? '50px' : '32px',
						}}
					></div>
				</div>
				<div className={styles.item}>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
						<div className={styles.markerGroup}>
							<div className={[styles.taskText, isDone ? styles.taskIsDone : ''].join(' ')}>{task}</div>
						</div>
						<div className={styles.buttons}>
							<img src={logo} alt='close' onClick={() => handleDelete(id)} />
							<Switch isDone={isDone} onClick={() => handleChangeDone(id, isDone)}></Switch>
						</div>
					</div>
					{isToday && news && settingNews === 0 && (
						<div style={{ overflow: 'hidden', width: '100%' }}>
							<div className={styles.marquee}>
								<p>{news?.title}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
