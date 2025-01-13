import { FaPencil } from 'react-icons/fa6'

const CategoryTitle = ({ children }) => {
	return (
		<h2 className='flex gap-2 py-3'>
			<span className='text-xl'>{children}</span>
			<FaPencil className='text-xl cursor-pointer' />
		</h2>
	)
}

export default CategoryTitle
