import dayjs from 'dayjs';
import { TDrawToDo, TTodo } from '../types';

export function typedFetchData<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
	return fetch(url, config)
		.then((response) => response.json())
		.then((data) => data as TResponse);
}

export const sortTodos = (todos: TTodo[]): TDrawToDo[] => {
	const newTodos = todos.reduce((acc: Record<string, TTodo[]>, current: TTodo) => {
		return acc[current.date]
			? { ...acc, [current.date]: [...acc[current.date], current] }
			: { ...acc, [current.date]: [current] };
	}, {});

	const sortednewTodo = Object.entries(newTodos).sort((a, b) => {
		return dayjs(a[0], 'DD.MM.YYYY') > dayjs(b[0], 'DD.MM.YYYY') ? 1 : -1;
	});

	return sortednewTodo;
};

export const showDate = (date: string): string => {
	if (date === dayjs().format('DD.MM.YYYY')) {
		return 'Today Tasks';
	}

	if (dayjs(date, 'DD.MM.YYYY').isTomorrow()) {
		return 'Tomorrow Tasks';
	}

	return dayjs(date, 'DD.MM.YYYY').format('DD/MM');
};

export const findColor = (number: number): string => {
	return String(number % 4);
};
