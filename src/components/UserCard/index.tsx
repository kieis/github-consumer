import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { TbBrandGithubFilled } from "react-icons/tb";
import { ChakraBox, variants } from "./motion";

type UserCardData = {
  id: string;
  login: string;
};

interface Props {
    data: UserCardData;
}

export default function UserCard({ data: { id, login } }: Props) {
  return (
    <ChakraBox
      display="flex"
      flexDir="row"
      background="gray.300"
      borderRadius="xl"
      padding={2}
      alignItems="center"
      justifyContent="space-between"
      initial={variants.init}
      animate={variants.animate}
      whileHover={variants.hover}
      cursor="pointer"
    >
      <Flex alignItems="center" gap={2}>
        <Icon as={TbBrandGithubFilled} boxSize={6} />
        <Tooltip label="User Login" borderRadius={4} aria-label="Login user from github">
          <Text color="gray.800" userSelect="none" >
            {login}
          </Text>
        </Tooltip>
      </Flex>
      <Tooltip label="User Id" borderRadius={4} aria-label="Id user from github">
        <Text color="gray.800" marginRight={4} userSelect="none">
          {id}
        </Text>
      </Tooltip>
    </ChakraBox>
  );
}
