import { FaLocationDot, FaPhone, FaWifi } from 'react-icons/fa6'

const PlaceInfoAddress = ({ address, country, city, phone, wifi }) => {
	return (
		<div className='flex flex-wrap gap-2 items-start'>
			{(address || country || city) && (
				<div className='flex items-center gap-2'>
					<FaLocationDot />
					<div>
						{address} {country} {city}
					</div>
				</div>
			)}
			{phone && (
				<div className='flex items-center gap-2'>
					<FaPhone />
					<a href={`tel:${phone}`}>{phone}</a>
				</div>
			)}
			{wifi && (
				<div className='flex items-center gap-2'>
					<FaWifi />
					{wifi}
				</div>
			)}
		</div>
	)
}

export default PlaceInfoAddress
