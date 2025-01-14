import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { FaPencil } from 'react-icons/fa6'
import PlaceEditForm from './PlaceEditForm'
const PlaceEditButton = ({ data }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div className='flex flex-col gap-2'>
			<FaPencil onClick={onOpen} className='text-xl cursor-pointer' />

			<Modal
				placement='center'
				isOpen={isOpen}
				scrollBehavior='inside'
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Редактировать информацию о заведении
							</ModalHeader>
							<ModalBody>
								<PlaceEditForm data={data} fnOnClose={onClose} />
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default PlaceEditButton
