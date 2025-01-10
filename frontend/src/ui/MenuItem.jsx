import OptionsButton from './OptionsButton'

const MenuItem = () => {
	return (
		<button className=' rounded-full flex flex-col items-center gap-2'>
			<span className='bg-red-600 px-4 py-1 rounded-xl cursor-pointer'>
				Еда
			</span>
			<OptionsButton />
		</button>
	)
}

export default MenuItem
