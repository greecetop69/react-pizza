import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import loginSvg from '../../assets/img/login.svg';

const LoginForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

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

	return (
		<>
			<Button type='primary' onClick={showModal} style={{ background: '#FE5F1E', height: '39px' }}>
				<img width='30' src={loginSvg} alt='Login logo' className='login__svg' />
			</Button>

			<Modal
				title='Basic Modal'
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
						label='Username'
						name='username'
						value={login}
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						value={password}
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name='remember'
						valuePropName='checked'
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default LoginForm;
