import { useCart } from '@/lib/cart'
import FootbarItem from '@/ui/FootbarItem'
import { FaPencil } from 'react-icons/fa6'
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiQrCodeLine } from 'react-icons/ri'
import { Link, useLocation } from 'react-router'

export const Footer = () => {
	const { cart } = useCart()
	const { pathname } = useLocation()
	return (
		<footer className='bg-[#181a1b] w-full rounded-t-xl z-10 fixed bottom-0'>
			{cart.length > 0 && pathname !== '/cart' && (
				<Link
					to='/cart'
					className='rounded-t-lg cursor-pointer flex justify-center items-center text-lg font-semibold bg-red-600 w-full max-w-[600px] mx-auto bottom-[70px] h-[60px]'
				>
					Просмотреть заказы
				</Link>
			)}
			<div className='container grid grid-cols-3 items-center justify-items-center mx-auto max-w-[600px] py-3  h-full'>
				<FootbarItem>
					<FaPencil className='text-2xl' />
					Меню
				</FootbarItem>
				<FootbarItem link='/qrcode'>
					<RiQrCodeLine className='text-2xl' />
					QrCode
				</FootbarItem>
				<FootbarItem link='settings'>
					<HiDotsHorizontal className='text-2xl' />
					Еще
				</FootbarItem>
			</div>
		</footer>
	)
}
