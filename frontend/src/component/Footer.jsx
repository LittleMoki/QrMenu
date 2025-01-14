import FootbarItem from '@/ui/FootbarItem'
import { FaPencil } from 'react-icons/fa6'
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiQrCodeLine } from 'react-icons/ri'

export const Footer = () => {
	return (
		<footer className='bg-[#181a1b] w-full h-[70px] rounded-t-xl z-10 fixed bottom-0'>
			<div className='container grid grid-cols-3 items-center justify-items-center mx-auto max-w-[600px]  h-full'>
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
