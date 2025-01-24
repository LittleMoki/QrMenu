import { usePlaceDataMutation } from '@/api/PlaceApiHook'
import { Button, Form, Input, Spinner, Textarea } from '@nextui-org/react'
import { useMemo, useState } from 'react'

const PlaceEditForm = ({ fnOnClose, data }) => {
	const [submitted, setSubmitted] = useState(data)
	const placeId = useMemo(() => {
		return data?.id // Храним id
	}, [])
	const [errors, setErrors] = useState({})

	const { mutate, isPending } = usePlaceDataMutation(placeId)

	const onSubmit = e => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		// Добавляем дополнительные данные в FormData
		formData.append('id', placeId)

		// Clear errors and submit
		setErrors({})
		setSubmitted(Object.fromEntries(formData))

		// Отправляем FormData в mutate
		mutate(formData)
	}

	return (
		<Form
			className='w-full justify-center items-center space-y-4'
			validationBehavior='native'
			validationErrors={errors}
			onReset={() => setSubmitted(null)}
			onSubmit={onSubmit}
		>
			<div className='flex w-full flex-col gap-4'>
				<Input
					isRequired
					errorMessage={({ validationDetails }) => {
						if (validationDetails.valueMissing) {
							return 'Пожалуйста напишите название заведения'
						}
						return errors.name
					}}
					label='Название заведения'
					labelPlacement='outside'
					name='name'
					placeholder=' '
					defaultValue={submitted?.name}
				/>
				<div className='flex gap-3'>
					<Input
						isRequired
						errorMessage={({ validationDetails }) => {
							if (validationDetails.valueMissing) {
								return 'Пожалуйста напишите символ валюты'
							}
							return errors.currency
						}}
						label='Валюта'
						labelPlacement='outside'
						name='currency'
						placeholder=' '
						defaultValue={submitted?.currency}
					/>
					<Input
						label='Телефон'
						labelPlacement='outside'
						name='phone'
						placeholder=' '
						type='number'
						defaultValue={submitted?.phone}
					/>
				</div>

				<Input
					label='Пароль wifi'
					labelPlacement='outside'
					name='wifi'
					placeholder=' '
					defaultValue={submitted?.wifi}
				/>
				<div className='flex gap-3'>
					<Input
						label='Страна'
						labelPlacement='outside'
						name='country'
						placeholder=' '
						defaultValue={submitted?.country}
					/>
					<Input
						label='Город'
						labelPlacement='outside'
						name='city'
						placeholder=' '
						defaultValue={submitted?.city}
					/>
				</div>
				<Input
					label='Адрес'
					labelPlacement='outside'
					name='address'
					placeholder=' '
					defaultValue={submitted?.address}
				/>
				<Input
					label='Фоновое изображение'
					labelPlacement='outside'
					name='bgImage'
					placeholder=' '
					type='file'
					defaultValue={submitted?.bgImage}
				/>

				<Textarea
					label='Описание'
					labelPlacement='outside'
					name='description'
					placeholder=' '
					defaultValue={submitted?.description}
				/>
				<div className='flex gap-4 pb-3'>
					<Button
						className='w-full'
						color='primary'
						type='submit'
						isLoading={isPending && <Spinner />}
					>
						Сохранить
					</Button>
					<Button color='danger' variant='flat' onPress={fnOnClose}>
						Закрыть
					</Button>
				</div>
			</div>
		</Form>
	)
}

export default PlaceEditForm
