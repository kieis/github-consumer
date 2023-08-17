"use client";
import { DisplayList, DisplayListData } from "@/components/DisplayList";
import Container from "@/components/Container";
import { fetchData } from "@/utils";
import { Button, Divider, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Heading from "@/components/Heading";

type ResponseData = {
  data: DisplayListData[];
  nextPage: string;
};

export default function Home() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseData | null>(null);

  const handleFetchError = () => {
    return toast({
      title: "Error",
      description: "Can't fetch data.",
      status: "error",
      position: "top-right",
      isClosable: true,
    });
  };

  const reOrderUsersData = (data: any[]) =>
    data.map(({ id, login }: any) => ({
      id: id,
      name: login,
      url: `/details/${login}`,
    }));

  async function handleNextPage() {
    if (data?.nextPage) {
      const httpsNextPage = data.nextPage
      .replace("https", "http")
      .replace("http", "https");

      return await fetchData({
        url: httpsNextPage,
        setIsLoading,
        setData,
        reOrderData: reOrderUsersData,
        handleError: handleFetchError,
      });
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
    fetchData({
      url: process.env.NEXT_PUBLIC_API_URL + "/users",
      setIsLoading,
      setData,
      reOrderData: reOrderUsersData,
      handleError: handleFetchError,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Heading>Listing all github users</Heading>
      <DisplayList data={data?.data} isLoading={isLoading} />
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
  );
}
