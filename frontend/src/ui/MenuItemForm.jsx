import {
	useMenuItemMutationPost,
	useMenuItemMutationPut,
} from '@/api/MenuItemApiHook'
import {
	Button,
	Checkbox,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Textarea,
} from '@nextui-org/react'
import { useState } from 'react'
import { useParams } from 'react-router'

const MenuItemForm = ({ menuItemId, isOpen, onOpenChange, data = [] }) => {
	const [submitted, setSubmitted] = useState(data)
	const [errors, setErrors] = useState({})
	const { mutate: post } = useMenuItemMutationPost()
	const { mutate: put } = useMenuItemMutationPut(menuItemId?.id)
	const { id } = useParams()

	const onSubmit = e => {
		e.preventDefault()
		const data = Object.fromEntries(new FormData(e.currentTarget))
		// Clear errors and submit
		setErrors({})
		setSubmitted(data)
		if (menuItemId !== undefined) {
			put({
				...data,
				isVisible: data.isVisible ? true : false,
				isAvailable: data.isAvailable ? true : false,
				categoryId: id,
				image: data.image.name,
				price: Number(data.price),
			})
		} else {
			post({
				...data,
				isVisible: data.isVisible ? true : false,
				isAvailable: data.isAvailable ? true : false,
				categoryId: id,
				image: data.image.name,
				price: Number(data.price),
			})
		}
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
								{data.id === menuItemId?.id
									? 'Добавить позицию меню'
									: 'Редактировать позицию меню'}
							</ModalHeader>
							<ModalBody>
								<Form
									className='w-full justify-center items-start space-y-4'
									validationBehavior='native'
									validationErrors={errors}
									onReset={() => setSubmitted(null)}
									onSubmit={onSubmit}
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
										<Input
											label='Цена'
											placeholder=' '
											labelPlacement='outside'
											name='price'
											type='number'
											defaultValue={menuItemId?.price}
										/>
										<Textarea
											label='Описание'
											labelPlacement='outside'
											name='description'
											minRows={20}
											placeholder=' '
											defaultValue={menuItemId?.description}
										/>
										<div className='flex gap-3 flex-wrap'>
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
										</div>
									</div>
									<Input name='image' type='file' />
									<div className='flex w-full justify-center pb-3 gap-2'>
										<Button color='danger' variant='flat' onPress={onClose}>
											Закрыть
										</Button>
										<Button
											// disabled={postPending || putPending}
											color='primary'
											type='submit'
											// isLoading={(postPending || putPending) && <Spinner />}
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
