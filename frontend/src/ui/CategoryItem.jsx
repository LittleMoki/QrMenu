import { useMenuCategoryDataMutationDelete } from '@/api/MenuCategoryApiHook'
import { Link } from 'react-router'
import MenuCategoryButton from './MenuCategoryButton'
import OptionsButton from './OptionsButton'

const CategoryItem = ({ data }) => {
	const { mutate, isPending } = useMenuCategoryDataMutationDelete()
	return (
		<div className='relative'>
			<Link
				className='bg-[url("https://dyj6gt4964deb.cloudfront.net/images/crop-e4809e19-c7f9-42fe-94e3-913b3b88ed0e.jpeg")] flex items-center justify-center min-h-[180px] bg-center rounded-3xl after:w-full after:h-full after:absolute after:z-[0] after:bg-[#252525]/40 after:rounded-3xl relative bg-no-repeat bg-cover'
				to={`/${data.id}`}
			>
				<h2 className='relative z-[1] text-3xl font-semibold'>{data.name}</h2>
			</Link>

			<div className='absolute z-[2] right-3 top-3'>
				<OptionsButton
					customButton={<MenuCategoryButton id={data.id} data={data} />}
					deleteMenu={mutate}
					isLoading={isPending}
					id={data.id}
				/>
			</div>
		</div>
	)
}

export default CategoryItem
