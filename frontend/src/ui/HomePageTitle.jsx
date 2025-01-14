import PlaceEditForm from './PlaceEditButton'

const HomePageTitle = ({ data }) => {
	return (
		<h1 className='flex gap-3 items-center pb-4 text-white'>
			<span className='text-3xl'>{data?.name}</span>
			<PlaceEditForm data={data} />
		</h1>
	)
}

export default HomePageTitle
