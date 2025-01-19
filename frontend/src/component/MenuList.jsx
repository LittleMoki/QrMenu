import { useMenuData } from '@/api/MenuApiHook'
import MenuAddButton from '@/ui/MenuAddButton'
import MenuItem from '@/ui/MenuItem'
import { useEffect, useState } from 'react'

const MenuList = ({data,id,setId}) => {
	
	return (
		<div className='flex items-center gap-4 py-3  overflow-x-auto scroll'>
			<MenuAddButton />
			{data?.map(item => (
				<MenuItem id={id} setId={setId} data={item} key={item.id} />
			))}
		</div>
	)
}

export default MenuList
