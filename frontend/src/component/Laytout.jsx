import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import Header from './Header'

const Laytout = () => {
	return (
		<>
			<Header />
			<main className='container mx-auto max-w-[600px] pb-16 pt-6 px-4 flex flex-col flex-grow-1 relative rounded-t-3xl mt-[-32px] bg-[#181a1b]'>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Laytout
