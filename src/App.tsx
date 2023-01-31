import { FC, useEffect, useState } from 'react';
import { useStore } from 'context/store';
import { TodoList } from 'components/TodoList/TodoList';
import { Header } from 'components/Header/Header';
import { CatPage } from 'components/CatPage/CatPage';
import { useChangeDone, useDeletTask, useGetToDos } from 'data-service/todos';
import { useGetNews } from 'data-service/news';
import { showDate } from 'utils';
import styles from './App.module.scss';

const App: FC = () => {
	const [rundomNews, setRundomNews] = useState<number>(0);
	const { todos } = useGetToDos();
	const { mutate: deleteTask } = useDeletTask();
	const { mutate: changeDone } = useChangeDone();
	const { news } = useGetNews(rundomNews);

	const { setNews, isShowOnlyToday } = useStore();

	const handleDelete = (id: number): void => {
		return deleteTask(id);
	};

	const handleChangeDone = (id: number, isDone: boolean) => {
		changeDone({ id, isDone });
	};

	useEffect(() => {
		setRundomNews(Math.floor(Math.random() * 20 + 1));
	}, []);

	useEffect(() => {
		setNews(news);
	}, [news]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Header isShowGear={!!todos?.length} />
				<div className={styles.allTodos}>
					{todos?.length ? (
						todos.map((el) => {
							const [date, todos] = el;
							const isToday = showDate(date) === 'Today Tasks';
							if (!isToday && isShowOnlyToday) {
								<TodoList
									key={todos[0].id}
									date={date}
									todos={todos}
									handleChangeDone={handleChangeDone}
									handleDelete={handleDelete}
									isToday={isToday}
									amountTasks={todos?.length}
								/>;
							} else {
								return (
									<TodoList
										key={todos[0].id}
										date={date}
										todos={todos}
										handleChangeDone={handleChangeDone}
										handleDelete={handleDelete}
										isToday={isToday}
										amountTasks={todos?.length}
									/>
								);
							}
						})
					) : (
						<CatPage />
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
