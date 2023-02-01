import { FC, useEffect } from 'react';
import { useStore } from 'context/store';
import { TodoList } from 'components/TodoList/TodoList';
import { Header } from 'components/Header/Header';
import { CatPage } from 'components/CatPage/CatPage';
import { useChangeDone, useDeletTask, useGetToDos } from 'data-service/todos';
import { useGetNews } from 'data-service/news';
import { showDate } from 'utils';
import styles from './App.module.scss';

const App: FC = () => {
	const { todos } = useGetToDos();
	const { mutate: deleteTask } = useDeletTask();
	const { mutate: changeDone } = useChangeDone();
	const { arrayNewsFromApi } = useGetNews();

	const { arrayNews, setArrayNews,  setNews, isShowOnlyToday } = useStore();

	const handleDelete = (id: number): void => {
		return deleteTask(id);
	};

	const handleChangeDone = (id: number, isDone: boolean) => {
		changeDone({ id, isDone });
	};
	
	useEffect(() => {
		if (arrayNewsFromApi) {
			setArrayNews(arrayNewsFromApi)
			const random = Math.floor(Math.random() * 20 + 1)
			setNews(arrayNewsFromApi[random].title);
		}
	}, [arrayNewsFromApi]);

	useEffect(() => {
		let timerId = setInterval((arr) => {
			const random = Math.floor(Math.random() * 20 + 1)
			setNews(arr[random].title);
		}, 60000, arrayNews);

		return () => clearTimeout(timerId);
	}, [arrayNews]);

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
