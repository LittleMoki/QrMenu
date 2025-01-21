import { useCart } from '@/lib/cart'
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Form,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	Radio,
	RadioGroup,
	useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'

const ProductOpen = ({ data }) => {
	const { addToCart } = useCart()
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [submitted, setSubmitted] = useState()
	const [errors, setErrors] = useState({})

	const [selected, setSelected] = useState('')
	const [selectedCheckbox, setSelectedCheckbox] = useState([])
	const onSubmit = e => {
		e.preventDefault()
		const formData = Object.fromEntries(new FormData(e.currentTarget))
		setErrors({})
		const multipleAddonsPrice = selectedCheckbox.reduce(
			(acc, current) => acc + Number(current),
			0
		)
		const singleAddonPrice = formData.addonsPriceSingle
			? Number(formData.addonsPriceSingle)
			: 0
		const selectedVariantPrice = selected ? Number(selected) : 0
		const basePrice = data.price || 0

		const totalPrice =
			basePrice + multipleAddonsPrice + singleAddonPrice + selectedVariantPrice

		const cartItem = {
			id: data.id, // ID продукта
			name: data.name,
			price: totalPrice,
		}

		// Добавляем товар в корзину
		addToCart(cartItem)

		setSubmitted(totalPrice)
	}
	return (
		<>
			<div className='w-full flex justify-end'>
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
								<Form
									onSubmit={onSubmit}
									className='w-full justify-center items-start space-y-4'
									validationBehavior='native'
									validationErrors={errors}
									onReset={() => setSubmitted(null)}
								>
									<Image
										src='https://nextui.org/images/hero-card-complete.jpeg'
										alt='productImage'
									/>
									<div className='flex justify-between items-center'>
										<h2 className='text-xl font-bold'>{data?.name}</h2>
										<span className='text-xl text-red-600 font-bold'>
											{data?.price > 0 && data?.variant.length === 0
												? data?.price
												: ''}
										</span>
									</div>
									<p className='text-base'>{data?.description}</p>
									{data?.variant.length > 0 && (
										<div className='mt-4'>
											<h3 className='text-lg font-bold'>Варианты:</h3>
											<RadioGroup
												name='price'
												color='danger'
												value={selected}
												onValueChange={setSelected}
											>
												{data?.variant.map(variant => (
													<Radio key={variant.id} value={variant.price}>
														{variant.title} <span>{variant.price}$</span>
													</Radio>
												))}
											</RadioGroup>
										</div>
									)}
									{data?.addons.map(addons =>
										addons.selectType === 'SINGLE' ? (
											<RadioGroup
												key={addons.id}
												color='danger'
												label={addons.title}
												name='addonsPriceSingle'
											>
												{addons.options.map(option => (
													<Radio key={option.id} value={option.price}>
														{option.title} <span>{option.price}$</span>
													</Radio>
												))}
											</RadioGroup>
										) : (
											<CheckboxGroup
												color='danger'
												key={addons.id}
												name='addonsPriceMultiple'
												label={addons.title}
												value={selectedCheckbox}
												onValueChange={setSelectedCheckbox}
											>
												{addons.options.map(option => (
													<Checkbox key={option.id} value={option.price}>
														{option.title} <span>{option.price}$</span>
													</Checkbox>
												))}
											</CheckboxGroup>
										)
									)}

									<div className='flex justify-center w-full'>
										<Button
											type='submit'
											// onPress={onClose}
										>
											Добавить в корзину
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

export default ProductOpen
