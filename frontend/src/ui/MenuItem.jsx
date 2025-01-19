import { useMenuDataMutationDelete } from '@/api/MenuApiHook'
import { Link } from 'react-router'
import MenuPutButton from './MenuPutButton'
import OptionsButton from './OptionsButton'

const MenuItem = ({ data, id, setId }) => {
	const { mutate: deleteMenu, isPending } = useMenuDataMutationDelete()
	return (
		<div className='rounded-full flex flex-col items-center gap-2'>
			<Link
				to={'/'}
				onClick={() => setId(data.id)}
				className={`${
					id === data.id ? 'bg-red-600' : 'bg-red-300'
				}  px-4 py-1 rounded-xl cursor-pointer`}
			>
				{data.name}
			</Link>
			<OptionsButton
				isLoading={isPending}
				customButton={<MenuPutButton isLoading={isPending} {...data} />}
				id={data.id}
				deleteMenu={deleteMenu}
			/>
		</div>
	)
}

export default MenuItem
