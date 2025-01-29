import { useAuth } from '@/lib/auth'
import PlaceEditForm from './PlaceEditButton'

const HomePageTitle = ({ data }) => {
	const { user } = useAuth()

	return (
		<h1 className='flex gap-3 items-center pb-4 '>
			<span className='text-3xl'>{data?.name}</span>
			{user?.role === 'admin' ? <PlaceEditForm data={data} /> : ''}
		</h1>
	)
}

export default HomePageTitle
