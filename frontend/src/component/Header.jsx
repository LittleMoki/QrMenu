import { bgApi } from '@/api/api'

const Header = ({ image }) => {
	return (
		<header className='container overflow-hidden h-[160px] relative mx-auto max-w-[600px]'>
			<div
				className={`absolute left-0 top-0 w-full h-full bg-cover`}
				style={{ backgroundImage: `url('${bgApi}${image}')` }}
			></div>
		</header>
	)
}

export default Header
