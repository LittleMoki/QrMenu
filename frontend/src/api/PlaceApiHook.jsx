import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api } from './api'

export const usePlaceData = (enabled = true) => {
	return useQuery({
		queryKey: ['place'],
		queryFn: () => axios.get(`${api}/place`),
		select: data => data.data,
		enabled,
	})
}

export const usePlaceDataMutation = placeId => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['placeCreat'],
		mutationFn: data => axios.put(`${api}/place/${placeId}`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries(['place'])
		},
	})
}
