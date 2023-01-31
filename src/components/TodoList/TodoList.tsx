import { FC, useState } from 'react';
import dayjs from 'dayjs';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import { Checkbox, IconButton } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useStore } from 'context/store';
import { TodoItem } from 'components/TodoItem/TodoItem';
import { showDate } from 'utils';
import { TTodoListProps } from 'types';
import styles from './TodoList.module.scss';

dayjs.extend(isTomorrow);

export const TodoList: FC<TTodoListProps> = ({ date, todos, handleChangeDone, handleDelete, isToday, amountTasks }) => {
	const [isOpenList, setIsOpenList] = useState(false);

	const { news, settingNews, isShowOnlyToday, setIsShowOnlyToday } = useStore();

	return (
		<div key={date} className={styles.dayGroup}>
			{(isOpenList || isToday) && (
				<div style={{ display: 'flex' }}>
					{isToday && (
						<Checkbox
							checked={isShowOnlyToday}
							onChange={() => setIsShowOnlyToday(!isShowOnlyToday)}
							sx={{ color: 'white' }}
						/>
					)}{' '}
					<div className={styles.date}>{showDate(date)}</div>
					{!isToday && (
						<IconButton
							onClick={() => setIsOpenList(!isOpenList)}
							sx={{
								color: 'white',
								transform: 'rotate(180deg)',
							}}
						>
							<ExpandMoreRoundedIcon />
						</IconButton>
					)}
				</div>
			)}
			<div className={styles.group}>
				{isOpenList || isToday ? (
					todos.map((el, index) => {
						const { id, task, isDone } = el;
						return (
							<TodoItem
								key={id}
								id={id}
								task={task}
								isDone={isDone}
								index={index}
								handleChangeDone={handleChangeDone}
								handleDelete={handleDelete}
								isToday={isToday}
							/>
						);
					})
				) : (
					<div className={styles.hiddenItems}>
						<div className={styles.date}>
							{showDate(date)} <span>{`( ${amountTasks} )`}</span>
						</div>
						<IconButton onClick={() => setIsOpenList(!isOpenList)} sx={{ color: 'white' }}>
							<ExpandMoreRoundedIcon />
						</IconButton>
					</div>
				)}
				{isToday && news && settingNews === 1 && (
					<div className={styles.marquee}>
						<p>{news?.title}</p>
					</div>
				)}
			</div>
		</div>
	);
};
