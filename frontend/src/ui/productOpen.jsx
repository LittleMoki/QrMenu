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

	const [variant, setVariant] = useState([])
	const [addonsPriceSingle, setAddonsPriceSingle] = useState('')
	const [addonsPriceMultiple, setAddonsPriceMultiple] = useState([])

	const onSubmit = async e => {
		e.preventDefault()
		setErrors({})
		const addonsMultiple = addonsPriceMultiple.reduce(
			(acc, addon) => acc + addon.price,
			0
		)
		const totalPrice =
			data.price +
			(addonsPriceSingle?.price || 0) +
			addonsMultiple +
			(variant?.price || 0)

		const cartItem = {
			id: data.id, // ID продукта
			addons: [...addonsPriceMultiple, addonsPriceSingle],
			variant: variant,
			price: totalPrice,
		}
		try {
			// Добавляем товар в корзину
			addToCart(cartItem)
		} catch (error) {
			console.error('Ошибка при добавлении товара в корзину:', error)
		}
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
											<h3 className='text-lg font-bold pb-2'>Варианты:</h3>
											<RadioGroup
												name='variant'
												color='danger'
												value={variant}
												onValueChange={setVariant}
											>
												{data?.variant.map(variant => (
													<Radio key={variant.id} value={variant}>
														<div className='text-xl'>
															{variant.title}{' '}
															<span className='text-red-600'>
																{variant.price}$
															</span>
														</div>
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
												value={addonsPriceSingle}
												onValueChange={setAddonsPriceSingle}
											>
												{addons.options.map(option => (
													<Radio key={option.id} value={option}>
														<div className='text-xl'>
															{option.title}{' '}
															<span className='text-red-600'>
																{option.price}$
															</span>
														</div>
													</Radio>
												))}
											</RadioGroup>
										) : (
											<CheckboxGroup
												color='danger'
												key={addons.id}
												name='addonsPriceMultiple'
												label={addons.title}
												value={addonsPriceMultiple}
												onValueChange={setAddonsPriceMultiple}
											>
												{addons.options.map(option => (
													<Checkbox key={option.id} value={option}>
														<div className='text-xl'>
															{option.title}{' '}
															<span className='text-red-600'>
																{option.price}$
															</span>
														</div>
													</Checkbox>
												))}
											</CheckboxGroup>
										)
									)}

									<div className='flex justify-center w-full'>
										<Button type='submit'>Добавить в корзину</Button>
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
