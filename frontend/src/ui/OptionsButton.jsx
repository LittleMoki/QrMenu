import { BiEditAlt, BiTrash } from 'react-icons/bi'

const OptionsButton = ({ deleteMenu, id, cutomButton = false }) => {
	return (
		<span className='flex justify-center gap-3 bg-red-600 px-4 py-2 rounded-xl'>
			{cutomButton ? (
				cutomButton
			) : (
				<BiEditAlt className='min-w-4 min-h-4 cursor-pointer' />
			)}
			<BiTrash
				onClick={() => deleteMenu(id)}
				className='min-w-4 min-h-4 cursor-pointer'
			/>
		</span>
	)
}

export default OptionsButton
