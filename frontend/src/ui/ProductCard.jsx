import { useMenuItemMutationDelete } from '@/api/MenuItemApiHook'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import MenuItemButton from './MenuItemButton'
import OptionsButton from './OptionsButton'
import ProductOpen from './productOpen'

const ProductCard = ({
	data,
	isOpen,
	onOpen,
	onOpenChange,
	setMenuItemId,
	menuItemId,
	categoryName,
}) => {
	const { mutate, isPending } = useMenuItemMutationDelete()
	return (
		<Card className='py-4 w-full dark'>
			<CardHeader className='pb-0 relative pt-2 px-4 flex-col items-start'>
				<div className='absolute flex items-center right-0 top-0 z-10'>
					<OptionsButton
						customButton={
							<MenuItemButton
								isOpen={isOpen}
								onOpen={onOpen}
								onOpenChange={onOpenChange}
								data={data}
								setMenuItemId={setMenuItemId}
								menuItemId={menuItemId}
								categoryName={categoryName}
							/>
						}
						deleteMenu={mutate}
						id={data?.id}
						isLoading={isPending}
					/>
				</div>
				<Image
					alt='Card background'
					className='object-cover rounded-xl w-full z-0'
					src='https://nextui.org/images/hero-card-complete.jpeg'
				/>
			</CardHeader>
			<CardBody className='overflow-visible py-2 w-full'>
				<h2 className='font-semibold'>{data?.name}</h2>
				<p>{data?.description}</p>

				<ProductOpen data={data} />
			</CardBody>
		</Card>
	)
}

export default ProductCard
