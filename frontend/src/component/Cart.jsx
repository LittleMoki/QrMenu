import { useCart } from '@/lib/cart'
import { FaTrash } from 'react-icons/fa6'

const Cart = () => {
	const { cart, removeFromCart } = useCart()
	const uniqueCartItems = Array.from(new Set(cart.map(item => item.id))).map(
		id => cart.find(item => item.id === id)
	) // Создаем массив уникальных товаров

	const currency = localStorage.getItem('currency')
	return (
		<div>
			<h2 className='text-2xl font-semibold'>Мой заказ</h2>
			<div className='flex flex-col gap-3'>
				{cart?.map((cart, index) => (
					<div
						key={index}
						className='text-2xl flex flex-wrap gap-1 items-center'
					>
						{cart.name} {cart.variant.title}
						{cart.addons.map((addon, index) => (
							<div key={index}>
								{addon.addon?.title} {addon.title && `(${addon?.title})`}
							</div>
						))}
						<span className='text-red-600 font-semibold text-3xl'>
							{cart?.price} {currency}
						</span>
						<FaTrash
							onClick={() => removeFromCart(cart?.id)}
							className='cursor-pointer'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Cart
