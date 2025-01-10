import { BiEditAlt, BiTrash } from 'react-icons/bi'

const OptionsButton = () => {
	return (
		<span className='flex justify-center gap-2 bg-red-600 px-4 py-2 rounded-xl'>
			{/* <BiUndo className='min-w-4 min-h-4 text-black' /> */}
			<BiEditAlt className='min-w-4 min-h-4 text-black cursor-pointer' />
			<BiTrash className='min-w-4 min-h-4 text-black cursor-pointer' />
		</span>
	)
}

export default OptionsButton
