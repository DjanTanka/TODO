import { FC } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TAddTaskFormProps } from 'types';
import { ColorButton } from 'consts';
import styles from './AddTaskForm.module.scss';

export const AddTaskForm: FC<TAddTaskFormProps> = ({
	valueTask,
	valueDate,
	hanldeChangeTask,
	handleChangeDate,
	handleSubmitTask,
	handleDisplayForm,
	refLayOut,
	errorValueTask,
	errorMassage,
}) => {
	const heightAnchor = Number(refLayOut?.current?.offsetHeight);
	const top = Number(refLayOut?.current?.offsetTop) + heightAnchor + 16;
	const left = Number(refLayOut?.current?.offsetLeft) - 3;

	return (
		<>
			<div className={styles.layOut} onClick={handleDisplayForm}></div>
			<form className={styles.form} style={{ top, left }}>
				<TextField
					placeholder='Enter task...'
					variant='standard'
					value={valueTask}
					error={errorValueTask}
					helperText={errorMassage}
					onChange={(e) => hanldeChangeTask(e.target.value)}
					sx={{
						marginBottom: '20px',
						'& .MuiInput-input': {
							color: 'white',
							borderBottom: '1px solid white',
						},
					}}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<MobileDatePicker
						inputFormat='DD.MM.YYYY'
						value={valueDate}
						onChange={handleChangeDate}
						renderInput={(params) => <TextField {...params} />}
						className={styles.datepicker}
						mask='DD.MM.YYYY'
						disablePast={true}
					/>
				</LocalizationProvider>

				<ColorButton variant='contained' type='submit' onClick={(e) => handleSubmitTask(e)}>
					Записать
				</ColorButton>
			</form>
		</>
	);
};
