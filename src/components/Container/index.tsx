import { Container as ChakraContainer } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children, ...rest}: Props) {
  return (
    <ChakraContainer
      backgroundColor="gray.800"
      minWidth="100vw"
      maxWidth="100vw"
      minHeight="100vh"
      overflow="hidden"
    >
      <ChakraContainer
        maxWidth="1440px"
        display="flex"
        flexDir="column"
        paddingBlock={16}
        {...rest}
      >
        {children}
      </ChakraContainer>
    </ChakraContainer>
  );
}
