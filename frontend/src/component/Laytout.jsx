import HomePageTitle from '@/ui/HomePageTitle'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import Header from './Header'
import MenuList from './MenuList'
import PlaceInfo from './PlaceInfo'

const Laytout = () => {
	return (
		<>
			<Header />
			<main className='container mx-auto max-w-[600px] pb-16 pt-6 px-4 flex flex-col flex-grow-1 relative rounded-t-3xl mt-[-32px] bg-[#181a1b]'>
				<HomePageTitle>LittleFood</HomePageTitle>
				<PlaceInfo />
				<MenuList />
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Laytout
