const Header = ({ image }) => {
	// Убираем '/public', если путь начинается с него
	const imagePath = image?.startsWith('/public')
		? image.replace('/public', '')
		: image

	return (
		<header className='container overflow-hidden h-[160px] relative mx-auto max-w-[600px]'>
			<div
				className={`absolute left-0 top-0 w-full h-full bg-cover`}
				style={{ backgroundImage: `url(${imagePath})` }}
			></div>
		</header>
	)
}

export default Header
