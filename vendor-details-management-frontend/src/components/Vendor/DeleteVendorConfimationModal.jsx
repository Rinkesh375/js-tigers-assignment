import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button } from "@chakra-ui/react";

/**
 * Component for rendering a modal to confirm vendor deletion.
 * @param {Function} handleDeleteVendor - Function to handle vendor deletion.
 * @param {boolean} isOpen - Flag indicating if the modal is open.
 * @param {Function} onClose - Function to close the modal.
 */
const DeleteVendorConfirmationModal = ({ handleDeleteVendor, isOpen, onClose }) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent padding={10}>
        <ModalCloseButton bg="white" />
        {/* Modal header */}
        <ModalHeader textAlign="center" fontSize="2xl" className="text-[#512DA8]">
          Confirm Delete
        </ModalHeader>
        <ModalBody display="flex" justifyContent="space-around">
          {/* Yes Button */}
          <Button onClick={handleDeleteVendor} bg="#4CAF50" color="white">
            Yes
          </Button>
          {/* No Button */}
          <Button onClick={onClose} bg="#F44336" color="white">
            NO
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DeleteVendorConfirmationModal;
