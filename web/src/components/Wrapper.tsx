import { Box } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant="regular"}) => {
        return (
          <Box /* box is like a div */
            mt={8}
            maxW={variant === "regular" ? "800px" : "400px"}
            mx="auto"
            w="100%"
          >
            {children}
          </Box>
        );
}