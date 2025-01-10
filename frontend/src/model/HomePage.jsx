import Category from '@/component/Category'
import MenuList from '@/component/MenuList'
import PlaceInfo from '@/component/PlaceInfo'
import HomePageTitle from '@/ui/HomePageTitle'

const HomePage = () => {
	return (
		<>
			<HomePageTitle>LittleFood</HomePageTitle>
			<PlaceInfo />
			<MenuList />
			<Category />
		</>
	)
}

export default HomePage
