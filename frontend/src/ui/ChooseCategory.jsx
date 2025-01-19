import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const ChooseCategory = ({ data, selectedCategory,categoryName, setSelectedCategory }) => {
	const handleSelect = addOns => {
		if (selectedCategory.some(item => item.id === addOns.id)) {
			// Удаление, если уже выбрано
			setSelectedCategory(
				selectedCategory.filter(item => item.id !== addOns.id)
			)
		} else {
			// Добавление нового выбора
			setSelectedCategory([...selectedCategory, addOns])
		}
	}
	return (
		<Autocomplete
			defaultItems={data}
			label='Категория'
			labelPlacement='outside'
			placeholder='Искать категорию ...'
			defaultInputValue={categoryName}
		>
			{item => (
				<AutocompleteItem
					key={item.id}
					onClick={() => handleSelect(item)}
					className={
						selectedCategory.some(item => item.id === item.id)
							? 'bg-gray-500'
							: ''
					}
				>
					{item.name}
				</AutocompleteItem>
			)}
		</Autocomplete>
	)
}

export default ChooseCategory
