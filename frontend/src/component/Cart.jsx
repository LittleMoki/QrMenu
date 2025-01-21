import { useCart } from '@/lib/cart'

const Cart = () => {
	const { cart } = useCart()
	return (
		<div>
			<h2 className='text-2xl font-semibold'>Мой заказ</h2>
			<div className='flex flex-col gap-3'>
				{cart.map(cart => (
					<div className='text-xl flex gap-6'>
						{cart.name}{' '}
						<span className='text-red-600 font-semibold text-lg'>
							{cart.price}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default Cart
