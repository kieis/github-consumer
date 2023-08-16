"use client";
import UserCard from "@/components/UserCard";
import {
  Button,
  Container,
  Divider,
  Flex,
  Link,
  Spinner,
  Text,
  textDecoration,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);

  const fetchData = async (url: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Can't fetch data.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  async function handleNextPage() {
    if (data?.nextPage) {
      return await fetchData(data.nextPage);
    }
    toast({
      title: "Warning",
      description: "Haven't a next page.",
      status: "warning",
      position: "top-right",
      isClosable: true,
    });
  }

  useEffect(() => {
    fetchData(process.env.NEXT_PUBLIC_API_URL + "/users");
  }, []);

  return (
    <Container
      backgroundColor="gray.800"
      minWidth="100vw"
      maxWidth="100vw"
      minHeight="100vh"
      overflow="hidden"
    >
      <Container
        maxWidth="1440px"
        display="flex"
        flexDir="column"
        paddingBlock={16}
      >
        <Text
          color="gray.200"
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="semibold"
          marginBlock={2}
        >
          Listing all github users
        </Text>
        {/* card section */}
        <Flex
          flexDir="column"
          gap={1}
          alignItems={isLoading ? "center" : "inherit"}
          justifyContent={isLoading ? "center" : "inherit"}
          maxHeight="70vh"
          minHeight="70vh"
          paddingRight={4}
          overflowY="scroll"
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
            data?.data?.map((user: any) => (
              <Link key={user.id} href={`/details/${user.login}`}>
                <UserCard data={user} />
              </Link>
            ))
          )}
        </Flex>

        <Divider marginBlock={4} />

        <Button
          variant="solid"
          colorScheme="gray"
          fontSize="sm"
          alignSelf="flex-end"
          onClick={handleNextPage}
          disabled={isLoading}
        >
          Next Page
        </Button>
      </Container>
    </Container>
  );
}
