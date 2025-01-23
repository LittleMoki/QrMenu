import LoginForm from '@/component/LoginForm'
import RegisterForm from '@/component/RegisterForm'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useState } from 'react'

const Auth = () => {
	const [selected, setSelected] = useState('login')

	return (
		<div className='flex flex-col justify-center px-3 h-screen w-full'>
			<Card>
				<CardBody className='overflow-hidden'>
					<Tabs
						fullWidth
						aria-label='Tabs form'
						selectedKey={selected}
						onSelectionChange={setSelected}
					>
						<Tab key='login' title='Login'>
							<LoginForm />
						</Tab>
						<Tab key='sign-up' title='Sign up'>
							<RegisterForm />
						</Tab>
					</Tabs>
				</CardBody>
			</Card>
		</div>
	)
}

export default Auth
