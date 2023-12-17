import React from 'react';
import { Button, HStack } from '@chakra-ui/react';

/**
 * Component for rendering pagination controls.
 * @param {Function} handlePageUpdate - Function to handle page updates.
 * @param {number} totalPages - Total number of pages.
 * @param {number} page - Current page number.
 */
const Pagination = ({ handlePageUpdate, totalPages, page }) => {
  return (
    <HStack spacing={4} mt={4} justify="center">
      {/* Button for navigating to the previous page */}
      <Button
        colorScheme='twitter'
        isDisabled={page === 1}
        onClick={() => handlePageUpdate(page - 1)}
      >
        Previous
      </Button>
      {/* Display current page number and total pages */}
      <Button colorScheme='twitter'>{page}/{totalPages}</Button>
      {/* Button for navigating to the next page */}
      <Button
        isDisabled={page === totalPages}
        colorScheme='twitter'
        onClick={() => handlePageUpdate(page + 1)}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
