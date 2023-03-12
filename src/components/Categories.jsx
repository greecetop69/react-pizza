import React from 'react';

function Categories({ value, onChangeCategory }) {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	return (
		<div className='categories'>
			<ul>
        {/* Тут лучше не использвоть i как key, т.к у тебя элементы массива все разные и уникальные и можно для 
          key взять categoryName
        */}
				{categories.map((categoryName, i) => (
					<li key={categoryName} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
