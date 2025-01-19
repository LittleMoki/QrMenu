import { useAddonData } from '@/api/AddonApiHook'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const AddOns = ({
	selectedAddons,
	setSelectedAddons,
}) => {
	const { data } = useAddonData()
	const handleSelect = addon => {
		setSelectedAddons(prev => {
			if (prev.some(selected => selected.id === addon.id)) {
				// Удаление, если уже выбрано
				return prev.filter(selected => selected.id !== addon.id)
			}
			return [...prev, addon]
		})
	}
	return (
		<div className='w-full'>
			{data && data.length > 0 ? (
				<Autocomplete
					defaultItems={data}
					label='Выберите добавки'
					placeholder='Искать добавки'
				>
					{addon => (
						<AutocompleteItem
							key={addon.id}
							onPress={() => handleSelect(addon)}
						>
							{addon.title}
						</AutocompleteItem>
					)}
				</Autocomplete>
			) : (
				<p>Данных нет для отображения</p>
			)}
			<div className='mt-4'>
				<h4>Выбранные добавки:</h4>

				{selectedAddons && (
					<ul className='flex flex-wrap gap-3'>
						{selectedAddons.map(addon => (
							<li key={addon.id}>{addon.title}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default AddOns
