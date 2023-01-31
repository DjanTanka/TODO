import {createContext, FC, useContext, useState } from 'react';
import { TodoContextType, TStoreProps } from 'types';

const Store = createContext<TodoContextType | null>(null);

export function useStore() {
	const store = useContext(Store);
	if (!store) {
		throw new Error('Something wrong!');
	} else {
		return store;
	}
}

const StoreProvider: FC<TStoreProps> = ({ children }) => {
	const [settingNews, setSettingNews] = useState<number>(1);
	
	const [news, setNews] = useState<any>('')
	const saveNewSetting = (value: number) => {
		setSettingNews(value);
	};

	const [isShowOnlyToday, setIsShowOnlyToday] = useState(false);

	const values = {
		settingNews,
		saveNewSetting,
		news,
		setNews,
		isShowOnlyToday,
		setIsShowOnlyToday
	}

	return <Store.Provider value={values}>{children}</Store.Provider>;
};

export default StoreProvider;
