import { Button } from '@nextui-org/react'

const QrCodePage = () => {
	return (
		<section className='flex flex-col gap-3 py-3 px-4 items-start'>
			<h1 className='text-2xl font-semibold'>QR код</h1>
			<p>Вы можете скачать его и распечатать</p>
			<Button className='dark'>Скачать</Button>
		</section>
	)
}

export default QrCodePage
