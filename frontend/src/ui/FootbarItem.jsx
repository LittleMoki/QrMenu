import { Link } from 'react-router'

const FootbarItem = ({ children, link = '/' }) => {
	return (
		<Link to={link} className='flex flex-col gap-1 items-center text-[12px]'>
			{children}
		</Link>
	)
}

export default FootbarItem
