import { Dayjs } from 'dayjs';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type TTodo = {
	id: number;
	task: string;
	isDone: boolean;
	date: string;
};

export type TDrawToDo = [string, TTodo[]];

export type TodoContextType = {
	settingNews: number;
	saveNewSetting: (value: number) => void;
	news: any;
	setNews: Dispatch<SetStateAction<string>>;
	isShowOnlyToday: boolean;
	setIsShowOnlyToday: Dispatch<SetStateAction<boolean>>;
};

export type TStoreProps = {
	children: ReactNode;
};

export type TAddTaskFormProps = {
	valueTask: string;
	valueDate: Dayjs | null;
	hanldeChangeTask: (value: string) => void;
	handleChangeDate: (value: Dayjs | null) => void;
	handleSubmitTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleDisplayForm: () => void;
	refLayOut: React.RefObject<HTMLInputElement>;
	errorValueTask: boolean;
	errorMassage: string;
};

export type THeaderProps = {
	isShowGear: boolean;
};

export type TSettingsProps = {
	handleShowSettings: () => void;
	refLayOut: React.RefObject<HTMLInputElement>;
};

export type TTodoListProps = {
	date: string;
	todos: TTodo[];
	handleChangeDone: (id: number, isDone: boolean) => void;
	handleDelete: (id: number) => void;
	isToday: boolean;
	amountTasks: number;
}
