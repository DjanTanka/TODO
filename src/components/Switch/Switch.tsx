import { Switch as SwitchMUI, SwitchProps, styled, FormControlLabel } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export const Switch = ({ onClick, isDone }: { onClick: () => void; isDone: boolean }) => {
	const IOSSwitch = styled((props: SwitchProps) => (
		<SwitchMUI
			focusVisibleClassName='.Mui-focusVisible'
			disableRipple
			{...props}
			icon={<CancelIcon />}
			checkedIcon={<CheckCircleRoundedIcon />}
		/>
	))(({ theme }) => ({
		width: 42,
		height: 26,
		padding: 0,
		'& .MuiFormControlLabel-root': {
			margin: 0,
		},
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: 2,
			transitionDuration: '300ms',
			'&.Mui-checked': {
				transform: 'translateX(16px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					backgroundColor: '#2ECA45',
					opacity: 1,
					border: 0,
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5,
				},
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				color: '#33cf4d',
				border: '6px solid #fff',
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: theme.palette.grey[100],
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.7,
			},
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: 22,
			height: 22,
		},
		'& .MuiSvgIcon-root': {
			marginTop: '-1px',
		},
		'& .MuiSwitch-track': {
			borderRadius: 26 / 2,
			backgroundColor: '#366EFF',
			opacity: 1,
			transition: theme.transitions.create(['background-color'], {
				duration: 500,
			}),
		},
	}));

	return (
		<FormControlLabel
			control={<IOSSwitch sx={{ m: 1 }} checked={isDone} />}
			label=''
			labelPlacement='start'
			onClick={onClick}
		/>
	);
};
