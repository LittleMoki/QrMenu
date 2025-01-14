import { useMenuDataMutationPut } from '@/api/MenuApiHook'
import {
	Button,
	Checkbox,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
const MenuPutButton = ({ name, isVisible: isVi, id }) => {
	console.log(id)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { mutate } = useMenuDataMutationPut(id)

	const [submitted, setSubmitted] = useState({
		name: name,
		isVisible: isVi,
	})
	const [isVisible, setIsVisible] = useState(isVi)
	const [errors, setErrors] = useState({})

	const onSubmit = e => {
		e.preventDefault()
		const data = Object.fromEntries(new FormData(e.currentTarget))

		// Custom validation checks
		const newErrors = {}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)

			return
		}

		setErrors({})
		mutate({
			name: data.name,
			isVisible: data.isVisible == '' ? true : false,
		})
		setSubmitted(data)
	}
	return (
		<>
			<span
				onClick={() => {
					onOpen()
				}}
				className='bg-red-600 rounded-full cursor-pointer'
			>
				<BiEditAlt className='min-w-4 min-h-4 cursor-pointer' />
			</span>
			<Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Редактировать меню
							</ModalHeader>
							<ModalBody>
								<Form
									className='w-full justify-center items-start space-y-4'
									validationBehavior='native'
									validationErrors={errors}
									onSubmit={onSubmit}
								>
									<Input
										isRequired
										errorMessage={({ validationDetails }) => {
											if (validationDetails.valueMissing) {
												return 'Пожалуйста напишите название меню'
											}

											return errors.name
										}}
										label='Название заведения'
										labelPlacement='outside'
										name='name'
										placeholder=' '
										defaultValue={submitted?.name}
									/>
									<Checkbox
										classNames={{
											label: 'text-small',
										}}
										name='isVisible'
										validationBehavior='aria'
										isSelected={isVisible}
										onValueChange={setIsVisible}
									>
										Меню видимо
									</Checkbox>
									<div className='flex gap-3'>
										<Button color='danger' variant='flat' onPress={onClose}>
											Закрыть
										</Button>
										<Button
											onPress={onClose}
											className='w-full'
											color='primary'
											type='submit'
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

export default MenuPutButton
