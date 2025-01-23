import { useMenuCategoryDataById } from '@/api/MenuCategoryApiHook'
import { useAuth } from '@/lib/auth'
import CategoryTitle from '@/ui/CategoryTitle'
import LoadingSkeleton from '@/ui/LoadingSkeleton'
import MenuCategoryButton from '@/ui/MenuCategoryButton'
import MenuItemButton from '@/ui/MenuItemButton'
import ProductCard from '@/ui/ProductCard'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { useParams } from 'react-router'

const Products = () => {
	const { id } = useParams()
	const { data, isLoading } = useMenuCategoryDataById(id)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [menuItemId, setMenuItemId] = useState('')
	const { user } = useAuth()

	if (isLoading) return <LoadingSkeleton />
	return (
		<>
			<CategoryTitle description={data?.description} title={data?.name}>
				{user?.role === 'admin' ? (
					<MenuCategoryButton data={data} id={id} />
				) : (
					''
				)}
			</CategoryTitle>

			{user?.role === 'admin' ? (
				<MenuItemButton
					isOpen={isOpen}
					onOpen={onOpen}
					onOpenChange={onOpenChange}
					setMenuItemId={setMenuItemId}
				/>
			) : (
				''
			)}

			<section className='flex flex-col gap-4 py-4'>
				{data?.items?.map(item => (
					<ProductCard
						key={item.id}
						isOpen={isOpen}
						onOpen={onOpen}
						onOpenChange={onOpenChange}
						setMenuItemId={setMenuItemId}
						data={item}
						menuItemId={menuItemId}
						categoryName={data?.name}
					/>
				))}
				{data?.items?.length === 0 && (
					<p className='text-center'>Нет продуктов в этой категории</p>
				)}
			</section>
		</>
	)
}

export default Products
