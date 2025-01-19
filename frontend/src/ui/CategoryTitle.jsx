const CategoryTitle = ({ children, title, description }) => {
	return (
		<>
			<h2 className='flex items-center gap-2 py-3'>
				<span className='text-xl'>{title}</span>
				<div className='text-xl'>{children}</div>
			</h2>
			<p>{description}</p>
		</>
	)
}

export default CategoryTitle
