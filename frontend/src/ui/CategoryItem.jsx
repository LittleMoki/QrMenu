import OptionsButton from './OptionsButton'

const CategoryItem = () => {
	return (
		<a
			className='bg-[url("https://dyj6gt4964deb.cloudfront.net/images/crop-e4809e19-c7f9-42fe-94e3-913b3b88ed0e.jpeg")] flex items-center justify-center min-h-[130px] bg-center rounded-3xl after:w-full after:h-full after:absolute after:z-[0] after:bg-[#252525]/40 after:rounded-3xl relative'
			href='#'
		>
			<h2 className='relative z-[1] text-3xl font-semibold'>Пиццы</h2>
			<div className='absolute z-[1] right-3 top-3'>
				<OptionsButton />
			</div>
		</a>
	)
}

export default CategoryItem
