import { useAddonDataMutationPost } from '@/api/AddonApiHook'
import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'

const CreateAddOns = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [options, setOptions] = useState([{ title: '', price: '' }])
	const [errors, setErrors] = useState({})
	const { mutate } = useAddonDataMutationPost()

	const handleOptionChange = (index, field, value) => {
		const updatedOptions = [...options]
		updatedOptions[index][field] = value
		setOptions(updatedOptions)
	}

	const addOption = () => {
		setOptions([...options, { title: '', price: 0 }])
	}

	const removeOption = index => {
		setOptions(options.filter((_, i) => i !== index))
	}

	const onSubmit = e => {
		e.preventDefault()
		if (e.target.id !== 'addOns') return
		const formData = Object.fromEntries(new FormData(e.currentTarget))

		mutate({
			title: formData.name,
			selectType: formData.selectType,
			options: options,
		})
	}

	return (
		<div>
			<Button onPress={onOpen}>Создавть новую добавку</Button>

			<Modal
				placement='center'
				isOpen={isOpen}
				scrollBehavior='inside'
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					<ModalHeader>Создать добавку</ModalHeader>
					<ModalBody>
						<Form
							id='addOns'
							className='w-full justify-center items-center space-y-4'
							validationBehavior='native'
							validationErrors={errors}
							onSubmit={e => {
								onSubmit(e)
							}}
						>
							<div className='flex w-full flex-col gap-4'>
								<Input
									isRequired
									errorMessage='Пожалуйста напишите название заведения'
									label='Название заведения'
									labelPlacement='outside'
									name='name'
									placeholder='Введите название'
								/>
								<Select
									isRequired
									errorMessage='Пожалуйста выберите тип'
									name='selectType'
									label='Тип'
									labelPlacement='outside'
									defaultSelectedKeys={['SINGLE']}
								>
									<SelectItem key='SINGLE' value='SINGLE'>
										Один на выбор
									</SelectItem>
									<SelectItem key='MULTI' value='MULTI'>
										Несколько на выбор
									</SelectItem>
								</Select>
								<div className='flex flex-col gap-3'>
									{options.map((option, index) => (
										<div key={index} className='flex flex-col gap-3'>
											<p>Опция {index + 1}</p>
											<Input
												isRequired
												errorMessage='Пожалуйста заполните это поле'
												type='text'
												placeholder='Название опции'
												labelPlacement='outside'
												value={option.title}
												onChange={e =>
													handleOptionChange(index, 'title', e.target.value)
												}
											/>
											<div className='flex gap-3 items-end'>
												<Input
													type='number'
													placeholder='Цена'
													labelPlacement='outside'
													value={option.price}
													onChange={e =>
														handleOptionChange(index, 'price', e.target.value)
													}
												/>
												<Button
													color='danger'
													variant='flat'
													onPress={() => removeOption(index)}
												>
													Удалить
												</Button>
											</div>
										</div>
									))}
									<Button color='primary' variant='flat' onPress={addOption}>
										Добавить опцию
									</Button>
								</div>
							</div>
							<div className='flex gap-4 py-3'>
								<Button className='w-full' color='primary' type='submit'>
									Сохранить
								</Button>
								<Button color='danger' variant='flat' onPress={onOpenChange}>
									Закрыть
								</Button>
							</div>
						</Form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default CreateAddOns
