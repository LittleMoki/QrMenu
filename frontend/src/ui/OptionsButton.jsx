import { useAuth } from '@/lib/auth'
import { Spinner } from '@nextui-org/react'
import { BiEditAlt, BiTrash } from 'react-icons/bi'

const OptionsButton = ({ deleteMenu, id, isLoading = false, customButton }) => {
	const { user } = useAuth()
	return (
		<span
			className={`${
				user?.role === 'admin' ? 'flex' : 'hidden'
			} justify-center gap-3 bg-red-600 px-4 min-h-[40px] items-center rounded-xl`}
		>
			{customButton ? (
				customButton
			) : (
				<BiEditAlt
					disabled={isLoading}
					className='min-w-4 min-h-4 cursor-pointer'
				/>
			)}
			<button disabled={isLoading}>
				{isLoading ? (
					<Spinner size='sm' />
				) : (
					<BiTrash
						onClick={() => deleteMenu(id)}
						className='min-w-4 min-h-4 cursor-pointer'
					/>
				)}
			</button>
		</span>
	)
}

export default OptionsButton
