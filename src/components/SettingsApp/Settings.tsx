import { FC } from 'react';
import { useStore } from 'context/store';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TSettingsProps } from 'types';
import { settings } from 'consts';
import styles from './Settings.module.scss';

export const Settings: FC<TSettingsProps> = ({ handleShowSettings, refLayOut }) => {
	const { settingNews, saveNewSetting } = useStore();

	const heightAnchor = Number(refLayOut?.current?.offsetHeight);
	const top = Number(refLayOut?.current?.offsetTop) + heightAnchor + 16;
	const left = Number(refLayOut?.current?.offsetLeft) - 3;

	return (
		<>
			<div className={styles.layOut} onClick={handleShowSettings}></div>
			<div className={styles.container} style={{ top, left }}>
				<FormControl>
					<RadioGroup
						aria-labelledby='demo-radio-buttons-group-label'
						value={settingNews}
						name='radio-buttons-group'
						sx={{
							'&': {
								alignItems: 'flex-end',
							},
						}}
					>
						{settings.map((el, index: number) => {
							return (
								<FormControlLabel
									key={el[index]}
									value={index}
									control={
										<Radio
											sx={{
												color: '#A9A9A9',
												'&.Mui-checked': {
													color: '#366EFF',
												},
											}}
										/>
									}
									onClick={() => saveNewSetting(index)}
									label={el[index]}
								/>
							);
						})}
					</RadioGroup>
				</FormControl>
			</div>
		</>
	);
};
