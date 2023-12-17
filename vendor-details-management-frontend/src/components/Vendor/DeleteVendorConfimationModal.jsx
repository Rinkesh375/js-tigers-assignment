
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button } from "@chakra-ui/react";

const DeleteVendorConfimationModal = ({handleDeleteVendor,isOpen,onClose}) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent padding={10}>
      <ModalCloseButton bg="white" />
      <ModalHeader textAlign="center" fontSize="2xl" className="text-[#512DA8]">Confirm Delete</ModalHeader>
      <ModalBody display="flex" justifyContent="space-around">
        {/* Yes Button */}
        <Button onClick={handleDeleteVendor} bg="#4CAF50" color="white" >Yes</Button>
        {/* No Button */}
        <Button onClick={onClose} bg="#F44336" color="white" >NO</Button>
      </ModalBody>
    </ModalContent>
  </Modal>
  );
}

export default DeleteVendorConfimationModal;
