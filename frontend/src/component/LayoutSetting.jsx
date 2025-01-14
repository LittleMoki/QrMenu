import { Outlet } from 'react-router'
import { Footer } from './Footer'

const LayoutSetting = () => {
	return (
		<>
			<main className='min-h-[calc(100vh-50px)] max-w-[600px] mx-auto'>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default LayoutSetting
