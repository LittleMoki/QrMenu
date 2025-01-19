import { BiEditAlt } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import MenuItemForm from './MenuItemForm'

const MenuItemButton = ({
	isOpen,
	onOpen,
	onOpenChange,
	data,
	setMenuItemId,
	menuItemId,
	categoryName,
}) => {
	return (
		<>
			{data !== undefined ? (
				<BiEditAlt
					onClick={() => {
						onOpen()
						setMenuItemId(data)
					}}
					className='min-w-4 min-h-4 cursor-pointer'
				/>
			) : (
				<span
					onClick={() => {
						onOpen()
						setMenuItemId(undefined)
					}}
					className='bg-red-600 py-3 mt-3 cursor-pointer rounded-full flex justify-center'
				>
					<FaPlus />
				</span>
			)}

			<MenuItemForm
				data={data}
				categoryName={categoryName}
				menuItemId={menuItemId}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	)
}

export default MenuItemButton
