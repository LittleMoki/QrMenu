import { useAuth } from '@/lib/auth'
import { Button, Form, Input } from '@nextui-org/react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'

export default function LoginForm() {
	const [password, setPassword] = useState('')
	const [submitted, setSubmitted] = useState(null)
	const [errors, setErrors] = useState({})
	const { login } = useAuth()
	const navigate = useNavigate();


	// Real-time password validation
	const getPasswordError = value => {
		if (value.length < 4) {
			return 'Пароль должен быть больше 4 символов'
		}

		return null
	}

	const onSubmit = e => {
		e.preventDefault()
		const data = Object.fromEntries(new FormData(e.currentTarget))

		// Custom validation checks
		const newErrors = {}

		// Password validation
		const passwordError = getPasswordError(data.password)

		if (passwordError) {
			newErrors.password = passwordError
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)

			return
		}

		// Clear errors and submit
		setErrors({})
		setSubmitted(data)
		login(data, {
			onSuccess: () => {
				navigate('/');
			},
			onError: error => {
				console.error('Error during login:', error)
			},
		})
	}

	return (
		<Form
			className='w-full py-5 justify-center items-center space-y-4'
			validationBehavior='native'
			validationErrors={errors}
			onReset={() => setSubmitted(null)}
			onSubmit={onSubmit}
		>
			<div className='flex flex-col gap-4 w-full'>
				<Input
					isRequired
					placeholder=' '
					label='Номер телефона'
					labelPlacement='outside'
					name='phone'
					errorMessage='Пожалуйста введите номер телефон'
					type='number'
				/>

				<Input
					isRequired
					errorMessage={getPasswordError(password)}
					isInvalid={getPasswordError(password) !== null}
					label='Пароль'
					labelPlacement='outside'
					name='password'
					placeholder='Пожалуйста введите пароль'
					type='password'
					value={password}
					onValueChange={setPassword}
				/>

				{errors.terms && (
					<span className='text-danger text-small'>{errors.terms}</span>
				)}

				<div className='flex gap-4'>
					<Button className='w-full' color='primary' type='submit'>
						Submit
					</Button>
				</div>
			</div>
		</Form>
	)
}
