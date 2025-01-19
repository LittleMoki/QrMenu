import { useMenuData } from '@/api/MenuApiHook'
import { usePlaceData } from '@/api/PlaceApiHook'
import HomePageTitle from '@/ui/HomePageTitle'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MenuContext } from '../../context'
import { Footer } from './Footer'
import Header from './Header'
import MenuList from './MenuList'
import PlaceInfo from './PlaceInfo'

const Laytout = () => {
	const { data } = usePlaceData()
	const { data: menuData } = useMenuData()

	const [id, setId] = useState()
	// Устанавливаем id только после загрузки данных
	useEffect(() => {
		if (menuData && menuData.length > 0) {
			setId(menuData[0].id)
		}
	}, [menuData])

	return (
		<>
			<MenuContext.Provider value={{ id }}>
				<Header />
				<main className='container mx-auto max-w-[600px] min-h-[calc(100vh-190px)] pb-16 pt-6 px-4 flex flex-col flex-grow-1 relative rounded-t-3xl mt-[-32px] bg-[#181a1b]'>
					<HomePageTitle data={data} />
					<PlaceInfo data={data} />
					<MenuList id={id} setId={setId} data={menuData} />
					<Outlet />
				</main>
				<Footer />
			</MenuContext.Provider>
		</>
	)
}

export default Laytout
