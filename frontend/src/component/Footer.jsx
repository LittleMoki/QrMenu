import FootbarItem from '@/ui/FootbarItem'
import { FaCartShopping, FaPencil } from 'react-icons/fa6'
import { HiDotsHorizontal } from 'react-icons/hi'

export const Footer = () => {
	return (
		<footer className='bg-[#181a1b] w-full rounded-t-xl z-10 fixed bottom-0'>
			<div className='container grid grid-cols-3 items-center justify-items-center mx-auto max-w-[600px] py-3  h-full'>
				<FootbarItem>
					<FaPencil className='text-2xl' />
					Меню
				</FootbarItem>
				<FootbarItem link='/cart'>
					<FaCartShopping className='text-2xl' />
					Корзина
				</FootbarItem>
				<FootbarItem link='settings'>
					<HiDotsHorizontal className='text-2xl' />
					Еще
				</FootbarItem>
			</div>
		</footer>
	)
}
