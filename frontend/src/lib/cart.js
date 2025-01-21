import { useEffect, useState } from 'react'

// Получить корзину из localStorage
const getCartFromStorage = () => {
	return JSON.parse(localStorage.getItem('cart')) || []
}

// Хук для управления корзиной
export const useCart = () => {
	const [cart, setCart] = useState(getCartFromStorage)

	// Сохранять изменения в localStorage
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	// Добавить товар
	const addToCart = item => {
		item.price !== 0 && setCart(prevCart => [...prevCart, item])
	}

	// Удалить товар
	const removeFromCart = itemId => {
		setCart(prevCart => prevCart.filter(item => item.id !== itemId))
	}

	// Обновить товар
	const updateCartItem = (itemId, updatedItem) => {
		setCart(prevCart =>
			prevCart.map(item =>
				item.id === itemId ? { ...item, ...updatedItem } : item
			)
		)
	}

	return { cart, addToCart, removeFromCart, updateCartItem }
}
