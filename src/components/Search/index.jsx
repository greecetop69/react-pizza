import debounce from 'lodash.debounce';
import React, { useContext, useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

const Search = () => {
	const [value, setValue] = useState('');
	const { setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	const onClickClear = () => {
		setSearchValue('');
		setValue('');
		inputRef.current.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 150),
		[],
	);
	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground='new 0 0 50 50'
				height='50px'
				id='Layer_1'
				version='1.1'
				viewBox='0 0 50 50'
				width='50px'
				xmlns='http://www.w3.org/2000/svg'>
				<rect fill='none' height='50' width='50' />
				<circle
					cx='21'
					cy='20'
					fill='none'
					r='16'
					stroke='#000000'
					strokeLinecap='round'
					strokeMiterlimit='10'
					strokeWidth='2'
				/>
				<line
					fill='none'
					stroke='#000000'
					strokeMiterlimit='10'
					strokeWidth='4'
					x1='32.229'
					x2='45.5'
					y1='32.229'
					y2='45.5'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<svg
					onClick={() => {
						onClickClear();
					}}
					className={styles.clearIcon}
					height='14px'
					version='1.1'
					viewBox='0 0 14 14'
					width='14px'
					xmlns='http://www.w3.org/2000/svg'>
					<title />
					<desc />
					<defs />
					<g fill='none' fillRule='evenodd' id='Page-1' stroke='none' strokeWidth='1'>
						<g fill='#000000' id='Core' transform='translate(-341.000000, -89.000000)'>
							<g id='close' transform='translate(341.000000, 89.000000)'>
								<path
									d='M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z'
									id='Shape'
								/>
							</g>
						</g>
					</g>
				</svg>
			)}
		</div>
	);
};

export default Search;
