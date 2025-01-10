import { FaPencil } from 'react-icons/fa6'

const HomePageTitle = ({ children }) => {
	return (
		<h1 className='flex gap-3 items-center pb-4 text-white'>
			<span className='text-3xl'>{children}</span>
			<FaPencil className='text-xl cursor-pointer' />
		</h1>
	)
}

export default HomePageTitle
