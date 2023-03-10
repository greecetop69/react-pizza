import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setItems } from '../redux/slices/pizzaSlice';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false); //Изначальнро первого рендера НЕТ

	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
	const items = useSelector((state) => state.pizza.items);

	const { searchValue } = useContext(SearchContext);
	const [isLoading, setIsLoading] = useState(true);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
		dispatch(setCurrentPage(1));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		try {
			const { data } = await axios.get(
				`https://639262efac688bbe4c62c42b.mockapi.io/items/?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`,
			);
			dispatch(setItems(data));
		} catch (error) {
			console.log('ERROr', error);
			alert('ошибка при получении пицц');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isMounted.current) {
			//первого рендера еще нет (useRef(false) => НЕ вшиваем в адресную строку параметры)
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`); //вшивание параметров в ссылку, только со 2го+ рендера
		}
		isMounted.current = true; //потом рендер появляется и проиходит вшивание параметров в урл
	}, [categoryId, sort.sortProperty, currentPage]);

	//если был первый рендер, то проверяем урл и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(
				//взятие данных из редакса для создания параметров ссылки
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true; //пришли параметры из url?, т.е. был первый рендер => выполняется запрос ниже fetchPizzas();
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
		// if (window.location.search) {
		// getPizzas();
		// }
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map((obj) => (
		<PizzaBlock
			key={obj.id}
			id={obj.id}
			title={obj.title}
			price={obj.price}
			imageUrl={obj.imageUrl}
			sizes={obj.sizes}
			types={obj.types}
		/>
	));
	const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
