import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TTodo } from 'types';
import { sortTodos, typedFetchData } from 'utils';

const getToDos = () => {
	return typedFetchData<TTodo[]>('http://localhost:3001/todos');
};

export const useGetToDos = () => {
	const query = useQuery<TTodo[], Error>('todos', () => getToDos());

	const newTodos = query.data && sortTodos(query.data);

	const todos = newTodos;
	const isLoading = query.isFetching;

	return {
		todos,
		isLoading,
	} as const;
};

const deleteTask = (id: number) => {
	const config = { method: 'DELETE' };
	return typedFetchData<TTodo[]>(`http://localhost:3001/todos/${id}`, config);
};

export const useDeletTask = () => {
	const client = useQueryClient();

	const query = useMutation('deleteTask', deleteTask, {
		onSuccess: () => {
			client.invalidateQueries('todos');
		},
	});

	return {
		mutate: query.mutate,
	} as const;
};

const addTask = (body: TTodo) => {
	const config = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	};
	return typedFetchData<TTodo[]>(`http://localhost:3001/todos/`, config);
};

export const useAddTask = () => {
	const client = useQueryClient();

	const query = useMutation('addTask', addTask, {
		onSuccess: () => {
			client.invalidateQueries('todos');
		},
	});

	return {
		mutate: query.mutate,
	} as const;
};

const changeDone = ({ id, isDone }: { id: number; isDone: boolean }) => {
	const config = {
		method: 'PATCH',
		body: JSON.stringify({ isDone: !isDone }),
		headers: { 'Content-Type': 'application/json' },
	};
	return typedFetchData<TTodo[]>(`http://localhost:3001/todos/${id}`, config);
};

export const useChangeDone = () => {
	const client = useQueryClient();

	const query = useMutation('changeDone', changeDone, {
		onSuccess: () => {
			client.invalidateQueries('todos');
		},
	});

	return {
		mutate: query.mutate,
	} as const;
};
