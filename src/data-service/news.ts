import { useQuery } from 'react-query';
import { TTodo } from 'types';
import { typedFetchData } from 'utils';

const getNews = () => {
	return typedFetchData<TTodo[]>(
		'https://newsapi.org/v2/top-headlines?country=ru&apiKey=a61727eb238d4c9ca7538fe21afee2b7',
	);
};

export const useGetNews = () => {
	const query = useQuery<any, Error>(['news'], () => getNews());

	const arrayNewsFromApi = query?.data?.articles;
	const isLoading = query.isFetching;

	return {
		arrayNewsFromApi,
		isLoading,
	} as const;
};
