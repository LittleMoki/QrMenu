import CategoryItem from '@/ui/CategoryItem'
import { FaPlus } from 'react-icons/fa6'

const Category = () => {
	return (
		<div className='py-3 flex flex-col gap-4'>
			<span className='bg-red-600 p-3 rounded-full flex justify-center '>
				<FaPlus />
			</span>
			<CategoryItem />
			<CategoryItem />
			<CategoryItem />
			<CategoryItem />
			<CategoryItem />
		</div>
	)
}

export default Category
