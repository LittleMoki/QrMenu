import CategoryTitle from '@/ui/CategoryTitle'
import ProductCard from '@/ui/ProductCard'
import { FaPlus } from 'react-icons/fa6'

const Products = () => {
	return (
		<>
			<CategoryTitle>Пиццы (11:00 - 21:00)</CategoryTitle>
			<span className='bg-red-600 p-3 rounded-full flex justify-center '>
				<FaPlus />
			</span>
			<section className='flex flex-col gap-4 py-4'>
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</section>
		</>
	)
}

export default Products
