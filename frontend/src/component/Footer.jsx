import FootbarItem from '@/ui/FootbarItem'
import { FaPencil } from 'react-icons/fa6'
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoExtensionPuzzle } from 'react-icons/io5'
import { RiQrCodeLine } from 'react-icons/ri'

export const Footer = () => {
	return (
		<footer className='bg-red-600 w-full h-[70px] rounded-t-xl z-10 fixed bottom-0'>
			<div className='container grid grid-cols-4 items-center justify-items-center mx-auto max-w-[600px]  h-full'>
				<FootbarItem>
					<FaPencil className='text-2xl' />
					Меню
				</FootbarItem>
				<FootbarItem>
					<IoExtensionPuzzle className='text-2xl' />
					Компоненты
				</FootbarItem>
				<FootbarItem>
					<RiQrCodeLine className='text-2xl' />
					QrCode
				</FootbarItem>
				<FootbarItem>
					<HiDotsHorizontal className='text-2xl' />
					Еще
				</FootbarItem>
			</div>
		</footer>
	)
}
