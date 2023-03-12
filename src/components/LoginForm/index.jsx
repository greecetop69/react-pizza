import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useState } from 'react';

import { useAppDispatch } from '../../redux/store';
import loginSvg from '../../assets/img/login.svg';
import { loginUser } from '../../redux/auth/actionCreators';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { fetchAuth, selectIsAuth } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const LoginForm = () => {
	const [username, setUsername] = useState('kminchelle');
	const [password, setPassword] = useState('0lelplR');
	const [isError, setIsError] = useState(false);
	const isAuth = useSelector(selectIsAuth);
	// const dispatch = useDispatch()

	const dispatch = useAppDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser({ username, password }));
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	async function authentication(username, password) {
		const data = await dispatch(fetchAuth({ username, password }));
		if (data.payload) {
			enqueueSnackbar('Successfully authorized!', {
				autoHideDuration: 1000,
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Логин или Пароль неверные', {
				autoHideDuration: 1000,
				variant: 'error',
			});
		}
	}

	return (
		<>
			<Button type='primary' onClick={showModal} style={{ background: '#FE5F1E', height: '39px' }}>
				<img width='30' src={loginSvg} alt='Login logo' className='login__svg' />
			</Button>

			<Modal
				title='Авторизация'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}>
				<Form
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Form.Item
						onSubmit={handleSubmit}
						label='kminchelle'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						label='0lelplR'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}>
						<Input.Password />
					</Form.Item>
					{/* {isError && <>Логин или пароль указаны неверно!</>} */}
					<Form.Item
						name='remember'
						valuePropName='checked'
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Checkbox>Запомнить меня</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button
							type='primary'
							htmlType='submit'
							onClick={() => authentication(username, password)}>
							Войти
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default LoginForm;
