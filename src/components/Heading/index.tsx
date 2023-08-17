import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Heading({ children, ...rest }: Props) {
  return (
    <Text
      color="gray.200"
      textTransform="uppercase"
      fontSize="sm"
      fontWeight="semibold"
      marginBlock={2}
      {...rest}
    >
      {children}
    </Text>
  );
}
