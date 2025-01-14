import PlaceInfoAddress from '@/ui/PlaceInfoAddress'
import PlaceInfoDescription from '@/ui/PlaceInfoDescription'

const PlaceInfo = ({ data }) => {
	return (
		<>
			<PlaceInfoAddress {...data} />
			<PlaceInfoDescription {...data} />
		</>
	)
}

export default PlaceInfo
