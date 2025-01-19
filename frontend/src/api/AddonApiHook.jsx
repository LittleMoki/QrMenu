import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api } from './api'

export const useAddonData = () => {
	return useQuery({
		queryKey: ['addon'],
		queryFn: () => axios.get(`${api}/addon`),
		select: data => data.data,
	})
}

export const useAddonDataMutationPost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['addonPost'],
		mutationFn: data => axios.post(`${api}/addon`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries({ queryKey: ['addon'] })
		},
	})
}

export const useAddonDataMutationPut = addonId => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['addonPut'],
		mutationFn: data => axios.put(`${api}/addon/${addonId}`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries({ queryKey: ['addon'] })
		},
	})
}

export const useAddonDataMutationDelete = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['addonDelete'],
		mutationFn: addonId => axios.delete(`${api}/addon/${addonId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addon'] })
		},
	})
}
