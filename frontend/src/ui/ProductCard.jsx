import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { IoMenuOutline } from 'react-icons/io5'
import OptionsButton from './OptionsButton'

const ProductCard = () => {
	return (
		<Card className='py-4 w-full dark'>
			<CardHeader className='pb-0 relative pt-2 px-4 flex-col items-start'>
				<div className='absolute right-0 top-0 z-10'>
					<OptionsButton />
				</div>
				<Image
					alt='Card background'
					className='object-cover rounded-xl w-full z-0'
					src='https://nextui.org/images/hero-card-complete.jpeg'
				/>
			</CardHeader>
			<CardBody className='overflow-visible py-2 w-full'>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
					soluta maiores fugit animi ipsum quaerat odio praesentium vero quidem
					error.
				</p>
				<div className='flex justify-end'>
					<IoMenuOutline className='bg-red-600 w-9 h-9 p-1 rounded-full cursor-pointer' />
				</div>
			</CardBody>
		</Card>
	)
}

export default ProductCard
