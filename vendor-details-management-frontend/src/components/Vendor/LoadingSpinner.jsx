import React from 'react';
import { Center, Image } from '@chakra-ui/react';
import LoadingImage from "../../asset/Loading Spinner.gif"

/**
 * Component for rendering a loading spinner.
 */
const LoadingSpinner = () => {
  return (
    // Center the loading spinner image
    <Center>
      {/* Display the loading spinner image */}
      <Image src={LoadingImage} alt="Loading..." />
    </Center>
  );
}

export default LoadingSpinner;
