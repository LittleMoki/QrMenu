import MenuItem from '@/ui/MenuItem'
import { FaPlus } from 'react-icons/fa6'

const MenuList = () => {
	return (
		<div className='flex items-center gap-4 py-3  overflow-x-auto scroll'>
			<span className='bg-red-600 p-3 rounded-full '>
				<FaPlus />
			</span>
			<MenuItem />
			<MenuItem />
		</div>
	)
}

export default MenuList
