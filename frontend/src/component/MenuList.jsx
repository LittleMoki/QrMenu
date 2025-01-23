import { useAuth } from '@/lib/auth'
import MenuAddButton from '@/ui/MenuAddButton'
import MenuItem from '@/ui/MenuItem'

const MenuList = ({ data, id, setId }) => {
	const { user } = useAuth()
	return (
		<div className='flex items-center gap-4 py-3  overflow-x-auto scroll'>
			{user?.role === 'admin' ? <MenuAddButton /> : ''}
			{data?.map(item => (
				<MenuItem id={id} setId={setId} data={item} key={item.id} />
			))}
		</div>
	)
}

export default MenuList
