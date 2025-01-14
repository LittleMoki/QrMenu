import { useMenuData } from '@/api/MenuApiHook'
import MenuAddButton from '@/ui/MenuAddButton'
import MenuItem from '@/ui/MenuItem'

const MenuList = () => {
	const { data } = useMenuData()

	return (
		<div className='flex items-center gap-4 py-3  overflow-x-auto scroll'>
			<MenuAddButton />
			{data?.map((item, index) => (
				<MenuItem data={item} key={index} />
			))}
		</div>
	)
}

export default MenuList
