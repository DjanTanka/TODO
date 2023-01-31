import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

export const settings: { [index: number]: string }[] = [
	{ 0: 'Show News in each item' },
	{ 1: 'Show News in block' },
	{ 2: 'Switch off News' },
]

export const markColor: { [index: string]: string } = {
	0: '#FF0000',
	1: '#366EFF',
	2: '#FFEB33',
	3: '#10C200',
};

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: 'white',
	backgroundColor: '#366EFF',
	marginBottom: '10px',
}));