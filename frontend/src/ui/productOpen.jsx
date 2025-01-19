import {
	Button,
	Checkbox,
	CheckboxGroup,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	Radio,
	RadioGroup,
	useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'

const ProductOpen = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selected, setSelected] = useState('Маленькая')
	const [selectedCheckbox, setSelectedCheckbox] = useState([])

	return (
		<>
			<div className='flex justify-end'>
				<IoMenuOutline
					onClick={onOpen}
					className='bg-red-600 w-9 h-9 p-1 rounded-full cursor-pointer'
				/>
			</div>
			<Modal
				size='2xl'
				placement='center'
				isOpen={isOpen}
				scrollBehavior='inside'
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalBody>
								<Image
									src='https://nextui.org/images/hero-card-complete.jpeg'
									alt='productImage'
								/>
								<h2>Название продукта</h2>
								<p>Описание продукта</p>
								<RadioGroup
									color='danger'
									value={selected}
									onValueChange={setSelected}
								>
									<Radio value='Маленькая'>
										Маленькая <span>20$</span>
									</Radio>
									<Radio value='Средняя'>
										Средняя <span>30$</span>
									</Radio>
									<Radio value='Большая'>
										Большая <span>40$</span>
									</Radio>
								</RadioGroup>
								<CheckboxGroup
									color='danger'
									label='Соусы'
									value={selectedCheckbox}
									onValueChange={setSelectedCheckbox}
								>
									<Checkbox value='Барбекю'>
										Барбекю <span>10$</span>
									</Checkbox>
									<Checkbox value='sydney'>
										Кетчуп <span>15$</span>
									</Checkbox>
									<Checkbox value='Горчица'>
										Горчица <span>20$</span>
									</Checkbox>
								</CheckboxGroup>
							</ModalBody>
							<ModalFooter className='flex justify-center'>
								<Button onPress={onClose}>Добавить в корзину</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default ProductOpen
