import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api as BaseApi } from './api'
const api = axios.create({
	baseURL: BaseApi, // Замените на свой API URL
})
export const useCart = () => {
	const queryClient = useQueryClient()

	// Получение данных о корзине
	const getCart = async userId => {
		const { data } = await axios.get(`/cart/${userId}`)
		return data
	}

	const {
		data: cart,
		isLoading,
		error,
	} = useQuery(
		['cart'],
		() => getCart('user-id-placeholder'), // replace 'user-id-placeholder' with actual userId
		{
			enabled: !!localStorage.getItem('user-id-placeholder'), // Replace with actual logic to check for userId
		}
	)

	// Mutation для добавления товаров в корзину
	const addToCart = async (userId, menuItemId, quantity) => {
		const { data } = await api.post('/cart', { userId, menuItemId, quantity })
		return data
	}

	const addToCartMutation = useMutation(
		item => addToCart(item.userId, item.menuItemId, item.quantity),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['cart'])
			},
		}
	)

	// Mutation для удаления товаров из корзины
	const removeFromCart = async cartItemId => {
		const { data } = await api.delete(`/cart/${cartItemId}`)
		return data
	}

	const removeFromCartMutation = useMutation(
		cartItemId => removeFromCart(cartItemId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['cart'])
			},
		}
	)

	return {
		cart,
		isLoading,
		error,
		addToCart: addToCartMutation.mutate,
		removeFromCart: removeFromCartMutation.mutate,
		addToCartLoading: addToCartMutation.isLoading,
		removeFromCartLoading: removeFromCartMutation.isLoading,
	}
}
