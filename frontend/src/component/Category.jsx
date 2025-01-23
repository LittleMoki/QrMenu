import { useMenuCategoryData } from '@/api/MenuCategoryApiHook'
import { useAuth } from '@/lib/auth'
import CategoryItem from '@/ui/CategoryItem'
import MenuCategoryForm from '@/ui/MenuCategoryButton'
import { useContext } from 'react'
import { MenuContext } from '../../context'

const Category = () => {
	const { id } = useContext(MenuContext)
	const { data } = useMenuCategoryData()
	const { user } = useAuth()

	return (
		<div className='py-3 flex flex-col gap-4'>
			{user?.role === 'admin' ? <MenuCategoryForm id={id} data={data} /> : ''}
			{data
				?.filter(el => el.menuId === id)
				.map(el => (
					<CategoryItem key={el.id} data={el} />
				))}
		</div>
	)
}

export default Category
