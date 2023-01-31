import { FC, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AddTaskForm } from 'components/AddTaskForm/AddTaskForm';
import { Settings } from 'components/SettingsApp/Settings';
import { useAddTask } from 'data-service/todos';
import plus from '../../assets/plus.svg';
import gear from '../../assets/gear.svg';
import { THeaderProps } from 'types';
import styles from './Header.module.scss';

export const Header: FC<THeaderProps> = ({ isShowGear }) => {
	const { mutate: addTask } = useAddTask();

	const [isShowForm, setIsShowForm] = useState<boolean>(false);
	const [isShowSettings, setIsShowSettings] = useState(false);
	const [valueTask, setValueTask] = useState<string>('');
	const [errorValueTask, setErrorValueTask] = useState<boolean>(false);
	const [errorMassage, setErrorMassage] = useState<string>('');
	const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs());

	const handleDisplayForm = () => {
		setIsShowForm(!isShowForm);
	};

	const handleShowSettings = () => {
		setIsShowSettings(!isShowSettings);
	};

	const handleSubmitTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (!valueTask) {
			setErrorValueTask(true);
			setErrorMassage('Meow! The Field should be filled');
			return;
		}

		const newTask = {
			id: Date.now(),
			task: valueTask,
			isDone: false,
			date: dayjs(valueDate).format('DD.MM.YYYY'),
		};

		addTask(newTask);
		setValueTask('');
		setErrorMassage('');
		setErrorValueTask(false);
		setValueDate(dayjs());
		setIsShowForm(false);
	};

	const hanldeChangeTask = (value: string): void => {
		setErrorMassage('');
		setErrorValueTask(false);
		setValueTask(value);
	};

	const handleChangeDate = (value: Dayjs | null): void => {
		setValueDate(value);
	};

	const refLayOut = useRef(null);

	return (
		<>
			<div ref={refLayOut} className={styles.header}>
				<div className={styles.add}>
					<p>To Do</p>
					<img src={plus} alt='plus' onClick={handleDisplayForm}></img>
				</div>
				{isShowGear && <img src={gear} alt='gear' onClick={handleShowSettings} />}
			</div>
			<div className={isShowForm || isShowSettings ? styles.dinamicLineShow : styles.dinamicLineHide} />
			{isShowForm && (
				<AddTaskForm
					valueTask={valueTask}
					valueDate={valueDate}
					hanldeChangeTask={hanldeChangeTask}
					handleChangeDate={handleChangeDate}
					handleSubmitTask={handleSubmitTask}
					handleDisplayForm={handleDisplayForm}
					refLayOut={refLayOut}
					errorValueTask={errorValueTask}
					errorMassage={errorMassage}
				/>
			)}
			{isShowSettings && <Settings handleShowSettings={handleShowSettings} refLayOut={refLayOut} />}
		</>
	);
};
