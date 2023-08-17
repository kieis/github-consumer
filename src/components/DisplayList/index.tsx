import { Flex, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import DisplayItem from "../DisplayItem";

export type DisplayListData = {
  id: number;
  name: string;
  url: string;
};

interface Props {
  data: DisplayListData[] | undefined;
  isLoading: boolean;
}

export function DisplayList({ data, isLoading }: Props) {
  return (
    <Flex
      flexDir="column"
      gap={1}
      alignItems={isLoading ? "center" : "inherit"}
      justifyContent={isLoading ? "center" : "inherit"}
      maxHeight="70vh"
      minHeight="70vh"
      paddingRight={4}
      overflowY="scroll"
      overflowX="hidden"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#A0AEC0",
          borderRadius: "24px",
        },
      }}
    >
      {isLoading ? (
        <Spinner color="green.400" />
      ) : (
        data?.map((item) => (
          <Link key={item.id} href={item.url}>
            <DisplayItem
              data={{
                id: item.id,
                name: item.name,
              }}
            />
          </Link>
        ))
      )}
    </Flex>
  );
}
