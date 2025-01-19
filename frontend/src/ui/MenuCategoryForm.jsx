import {
	useMenuCategoryDataMutationPost,
	useMenuCategoryDataMutationPut,
} from '@/api/MenuCategoryApiHook'
import {
	Button,
	Checkbox,
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
const MenuCategoryForm = ({ id, menuId, isOpen, onOpenChange, data = [] }) => {
	const [submitted, setSubmitted] = useState(data)
	const [errors, setErrors] = useState({})
	const { mutate: post, isPending: postPending } =
		useMenuCategoryDataMutationPost()
	const { mutate: put, isPending: putPending } =
		useMenuCategoryDataMutationPut(id)

	const onSubmit = e => {
		e.preventDefault()
		const data = Object.fromEntries(new FormData(e.currentTarget))

		// Clear errors and submit
		setErrors({})
		setSubmitted(data)
		if (data.id !== id) {
			put({
				...data,
				isVisible: data.isVisible ? true : false,
				image: data.image.name,
			})
		} else {
			post({
				...data,
				isVisible: data.isVisible ? true : false,
				menuId: menuId,
				image: data.image.name,
			})
		}
	}
	return (
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
							Редактировать информацию о заведении
						</ModalHeader>
						<ModalBody>
							<Form
								className='w-full justify-center items-start space-y-4'
								validationBehavior='native'
								validationErrors={errors}
								onReset={() => setSubmitted(null)}
								onSubmit={onSubmit}
							>
								<Input
									isRequired
									errorMessage={({ validationDetails }) => {
										if (validationDetails.valueMissing) {
											return 'Пожалуйста напишите название категории'
										}
										return errors.name
									}}
									label='Название категории'
									labelPlacement='outside'
									name='name'
									placeholder=' '
									defaultValue={submitted?.name}
								/>
								<Textarea
									label='Описание'
									labelPlacement='outside'
									name='description'
									minRows={20}
									placeholder=' '
								/>
								<Checkbox
									value={true}
									classNames={{
										label: 'text-small',
									}}
									name='isVisible'
									validationBehavior='aria'
								>
									Категория видимо
								</Checkbox>
								<Input name='image' type='file' />

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
	)
}

export default MenuCategoryForm
