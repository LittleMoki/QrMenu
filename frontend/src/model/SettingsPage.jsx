import { useAuth } from '@/lib/auth'
import { Button } from '@nextui-org/react'
import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router'

const SettingsPage = () => {
	const { user, logout } = useAuth()
	return (
		<div className='py-5 px-3 flex flex-col gap-3'>
			<div className='w-full bg-[#18181b] flex justify-between items-center px-3 py-4 rounded-lg'>
				<div className='text-xl font-semibold'>
					{user.firstName} {user.secondName}
				</div>
				<Button onPress={logout}>Выйти</Button>
			</div>
			<Link
				to='/cart'
				className='w-full bg-[#18181b] flex justify-center gap-3 items-center px-3 py-4 text-xl rounded-lg'
			>
				<FaCartShopping />
				Моя корзина
			</Link>
		</div>
	)
}

export default SettingsPage
