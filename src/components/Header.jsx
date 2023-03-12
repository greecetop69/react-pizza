import { Link } from 'react-router-dom';

import Search from './Search';
import logoSvg from '../assets/img/pizza-logo.svg';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { CartIndicator } from '../components/cart/cartIndicator';

function Header() {
	const { items, totalPrice } = useSelector((state) => state.cart);
	const totalCount = items.reduce((sum, item) => sum + item.count, 0);
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
					<div className='header__login'>
						<LoginForm />
					</div>

					<Link to='/cart' className='button button--cart'>
            <CartIndicator count={totalCount} price={totalPrice} />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;
