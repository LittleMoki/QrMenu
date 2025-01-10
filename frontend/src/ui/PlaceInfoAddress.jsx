import { FaLocationDot, FaPhone, FaWifi } from 'react-icons/fa6'

const PlaceInfoAddress = () => {
	return (
		<div className='flex flex-wrap gap-2 items-start text-white'>
			<div className='flex items-center gap-2'>
				<FaLocationDot />
				<a
					target='_blank'
					href='https://www.google.com/maps/place/Chinar+mall/@39.7541376,64.405504,13z/data=!4m9!1m2!2m1!1zc2Rmc2Rmcywg0KHQsNC80YvQuSDQu9GD0YfRiNC40Lkg0LPQvtGA0L7QtCwg0J_QvtGC0YDRj9GB0LDRjtGJ0LDRjyDRgdGC0YDQsNC90LA!3m5!1s0x3f5007fb96daba31:0x4aafd88484f0881!8m2!3d39.7410794!4d64.4285428!16s%2Fg%2F11rwmcb2bs?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D'
				>
					Самый лучший город, Потрясающая страна
				</a>
			</div>
			<div className='flex items-center gap-2'>
				<FaPhone />
				<a href='tel:918245004'>918245004</a>
			</div>
			<div className='flex items-center gap-2'>
				<FaWifi />
				CoolWiFiPassword
			</div>
		</div>
	)
}

export default PlaceInfoAddress
