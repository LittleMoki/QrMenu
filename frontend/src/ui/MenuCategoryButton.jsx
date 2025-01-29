import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import MenuCategoryForm from './MenuCategoryForm'

const MenuCategoryButton = ({ id, data = [] }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [idCategory, setIdCategory] = useState('')
	return (
		<>
			{data.id === id ? (
				<div>
					<BiEditAlt
						onClick={() => {
							onOpen()
							setIdCategory(data.id)
						}}
						className='min-w-4 min-h-4 cursor-pointer '
					/>
				</div>
			) : (
				<span
					onClick={() => {
						onOpen()
						setIdCategory(data.id)
					}}
					className='bg-red-600 text-white py-3 cursor-pointer rounded-full flex justify-center'
				>
					<FaPlus />
				</span>
			)}
			<MenuCategoryForm
				isOpen={isOpen}
				data={data}
				menuId={id}
				onOpenChange={onOpenChange}
				id={idCategory}
			/>
		</>
	)
}

export default MenuCategoryButton
