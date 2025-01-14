import {
	useMenuDataMutationDelete,
	useMenuDataMutationPut,
} from '@/api/MenuApiHook'
import MenuPutButton from './MenuPutButton'
import OptionsButton from './OptionsButton'

const MenuItem = ({ data, id }) => {
	const { mutate: deleteMenu } = useMenuDataMutationDelete()
	const { mutate: editMenu } = useMenuDataMutationPut()
	return (
		<button className=' rounded-full flex flex-col items-center gap-2'>
			<span className='bg-red-600 px-4 py-1 rounded-xl cursor-pointer'>
				{data.name}
			</span>
			<OptionsButton
				cutomButton={<MenuPutButton {...data} />}
				id={id}
				deleteMenu={deleteMenu}
			/>
		</button>
	)
}

export default MenuItem
