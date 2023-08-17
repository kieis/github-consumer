import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { TbBrandGithubFilled } from "react-icons/tb";
import { ChakraBox, variants } from "./motion";

type DisplayData = {
  id: number;
  name: string;
};

interface Props {
  data: DisplayData;
}

export default function DisplayItem({ data: { id, name } }: Props) {
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
        <Tooltip
          label="Name"
          borderRadius={4}
        >
          <Text color="gray.800" userSelect="none">
            {name}
          </Text>
        </Tooltip>
      </Flex>
      <Tooltip
        label="Id"
        borderRadius={4}
      >
        <Text color="gray.800" marginRight={4} userSelect="none">
          {id}
        </Text>
      </Tooltip>
    </ChakraBox>
  );
}
