import { useMenuDataMutationPost } from '@/api/MenuApiHook'
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
import { FaPlus } from 'react-icons/fa6'
const MenuAddButton = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [submitted, setSubmitted] = useState()
	const [isVisible, setIsVisible] = useState(true)
	const [errors, setErrors] = useState({})
	const { mutate } = useMenuDataMutationPost()
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
			isVisible: data.isVisible ? true : false,
		})
		setSubmitted(data)
	}
	return (
		<>
			<span
				onClick={onOpen}
				className='bg-red-600 p-3 rounded-full cursor-pointer'
			>
				<FaPlus />
			</span>
			<Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Добавить меню
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
										defaultValue={isVisible}
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
											Добавить
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

export default MenuAddButton
