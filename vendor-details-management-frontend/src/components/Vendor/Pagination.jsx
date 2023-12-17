import React from 'react';
import { Button, HStack } from '@chakra-ui/react';

/* handlePageUpdate={handlePageUpdate} totalPages={totalPages} page={page} */

const Pagination = ({ handlePageUpdate, totalPages, page }) => {
  return (
    <HStack spacing={4} mt={4} justify="center">
      <Button
        colorScheme='twitter'
        isDisabled={page === 1}

        onClick={() => handlePageUpdate(page - 1)}
      >
        Previous
      </Button>
      <Button colorScheme='twitter'>{page}/{totalPages}</Button>

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
