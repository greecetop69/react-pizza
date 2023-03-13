import { Link } from 'react-router-dom';
import Search from './Search';
import logoSvg from '../assets/img/pizza-logo.svg';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { CartIndicator } from '../components/cart/cartIndicator';
import { logout, selectIsAuth } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/store';
import { Button } from 'antd';
import { useState } from 'react';
import logoutSvg from '../assets/img/logout.svg';

function Header() {
	const dispatch = useAppDispatch();

	const { items, totalPrice } = useSelector((state) => state.cart);
	const totalCount = items.reduce((sum, item) => sum + item.count, 0);
	const isAuth = useSelector(selectIsAuth);
	return (
		<div className='header'>
			<div className='container'>
				<Link to='/'>
					<div className='header__logo'>
						<img width='38' src={logoSvg} alt='Pizza logo' />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>
				<Search />
				<div className='header__cart'>
					{isAuth ? (
						<>
							<Button
								type='primary'
								onClick={() => dispatch(logout())}
								style={{ background: '#fe5f1e', height: '39px' }}>
								<img width='30' src={logoutSvg} alt='Login logo' className='login__svg' />
							</Button>
							<Link to='/cart' className='button button--cart'>
								<CartIndicator count={totalCount} price={totalPrice} />
							</Link>
						</>
					) : (
						<div className='header__login'>
							<LoginForm />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
