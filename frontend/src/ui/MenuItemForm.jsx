import { useMenuCategoryData } from '@/api/MenuCategoryApiHook'
import {
	useMenuItemMutationPost,
	useMenuItemMutationPut,
} from '@/api/MenuItemApiHook'
import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
	Textarea,
} from '@nextui-org/react'
import { useState } from 'react'
import { useParams } from 'react-router'
import AddOns from './AddOns'
import ChooseCategory from './ChooseCategory'
import CreateAddOns from './CreateAddOns'

const MenuItemForm = ({
	menuItemId,
	isOpen,
	onOpenChange,
	categoryName,
	data = [],
}) => {
	const [submitted, setSubmitted] = useState(data)
	const [variant, setVariant] = useState(data.variant || [])
	const [selectedAddons, setSelectedAddons] = useState(data.addons)
	const [selectedCategory, setSelectedCategory] = useState([])
	const [errors, setErrors] = useState({})
	const { mutate: post, isPending: postPending } = useMenuItemMutationPost()
	const { mutate: put, isPending: putPending } = useMenuItemMutationPut(
		menuItemId?.id
	)
	const { data: categoryData } = useMenuCategoryData()
	const { id } = useParams()
	const onSubmit = e => {
		e.preventDefault()
		if (e.target.id !== 'menuItemForm') return

		const formData = new FormData(e.currentTarget)

		// Добавляем категорию, если она выбрана
		formData.append(
			'categoryId',
			selectedCategory.length > 0 ? selectedCategory[0].id : id
		)

		// Преобразуем addons в строку JSON и добавляем в formData
		if (selectedAddons !== undefined) {
			formData.append('addons', JSON.stringify(selectedAddons.map(el => el.id)))
		}

		// Добавляем варианты, если они есть
		if (variant.length > 0) {
			formData.append('variant', JSON.stringify(variant))
		}

		// Очистка ошибок и отправка данных
		setErrors({})
		setSubmitted(Object.fromEntries(formData))

		if (menuItemId !== undefined) {
			put(formData)
		} else {
			post(formData)
		}
	}

	const handleVariantChange = (index, field, value) => {
		const updatedVariants = [...variant]
		updatedVariants[index][field] = value
		setVariant(updatedVariants)
	}

	const addVariant = () => {
		setVariant([...variant, { title: '', price: 0 }])
	}

	const removeVariant = index => {
		setVariant(variant.filter((_, i) => i !== index))
	}

	return (
		<>
			<Modal
				placement='center'
				isOpen={isOpen}
				scrollBehavior='inside'
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								{data.id !== menuItemId?.id
									? 'Добавить позицию меню'
									: 'Редактировать позицию меню'}
							</ModalHeader>
							<ModalBody>
								<Form
									id='menuItemForm'
									onSubmit={e => {
										onSubmit(e) // Только если это правильная форма
									}}
									className='w-full justify-center items-start space-y-4'
									validationBehavior='native'
									validationErrors={errors}
									onReset={() => setSubmitted(null)}
								>
									<div className='flex flex-col gap-4 w-full'>
										<Input
											isRequired
											errorMessage={({ validationDetails }) => {
												if (validationDetails.valueMissing) {
													return 'Пожалуйста напишите название категории'
												}
												return errors.name
											}}
											label='Название позиции'
											labelPlacement='outside'
											name='name'
											placeholder=' '
											defaultValue={menuItemId?.name}
										/>
										{variant.length > 0 ? (
											variant.map((el, index) => (
												<div className='flex flex-col gap-3' key={index}>
													<Input
														isRequired
														errorMessage='Пожалуйста заполните это поле'
														type='text'
														placeholder='Название опции'
														labelPlacement='outside'
														value={el.title}
														onChange={e =>
															handleVariantChange(
																index,
																'title',
																e.target.value
															)
														}
													/>
													<div className='flex gap-3 items-end'>
														<Input
															type='number'
															placeholder='Цена'
															labelPlacement='outside'
															value={el.price}
															onChange={e =>
																handleVariantChange(
																	index,
																	'price',
																	e.target.value
																)
															}
														/>
														<Button
															color='danger'
															variant='flat'
															onPress={() => removeVariant(index)}
														>
															Удалить
														</Button>
													</div>
												</div>
											))
										) : (
											<Input
												label='Цена'
												placeholder=' '
												labelPlacement='outside'
												name='price'
												type='number'
												defaultValue={menuItemId?.price}
											/>
										)}
										<Button color='primary' variant='flat' onPress={addVariant}>
											Добавить опцию
										</Button>

										<Textarea
											label='Описание'
											labelPlacement='outside'
											name='description'
											minRows={20}
											placeholder=' '
											defaultValue={menuItemId?.description}
										/>
										{/* Todo */}
										{/* <div className='flex gap-3 flex-wrap'>
											<Checkbox
												value={true}
												classNames={{
													label: 'text-small',
												}}
												name='isVisible'
												validationBehavior='aria'
												defaultSelected={true}
											>
												Позиция видимо
											</Checkbox>
											<Checkbox
												value={true}
												classNames={{
													label: 'text-small',
												}}
												name='isAvailable'
												validationBehavior='aria'
											>
												Есть в наличии
											</Checkbox>
										</div> */}
									</div>
									<Input name='image' type='file' />

									<AddOns
										selectedAddons={selectedAddons}
										setSelectedAddons={setSelectedAddons}
									/>
									<CreateAddOns />
									{menuItemId !== undefined && (
										<ChooseCategory
											selectedCategory={selectedCategory}
											setSelectedCategory={setSelectedCategory}
											data={categoryData}
											categoryName={categoryName}
										/>
									)}
									<div className='flex w-full justify-center pb-3 gap-2'>
										<Button color='danger' variant='flat' onPress={onClose}>
											Закрыть
										</Button>
										<Button
											disabled={postPending || putPending}
											color='primary'
											type='submit'
											isLoading={(postPending || putPending) && <Spinner />}
										>
											Сохранить
										</Button>
									</div>
								</Form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default MenuItemForm
