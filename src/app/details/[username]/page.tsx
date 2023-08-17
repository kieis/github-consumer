"use client";
import Container from "@/components/Container";
import { DisplayList, DisplayListData } from "@/components/DisplayList";
import Heading from "@/components/Heading";
import { UserCard, UserDetailData } from "@/components/UserCard";
import { fetchData } from "@/utils";
import { Button, Divider, Flex, Icon, Link, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosReturnLeft } from "react-icons/io";

type UserResponse = {
  data: UserDetailData;
};

type ReposResponseData = {
  data: DisplayListData[];
};

interface Props {
  params: {
    username: string;
  };
}

export default function Details({ params: { username } }: Props) {
  const toast = useToast();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [repos, setRepos] = useState<ReposResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchError = () => {
    return toast({
      title: "Error",
      description: "Can't fetch data.",
      status: "error",
      position: "top-right",
      isClosable: true,
    });
  };

  const reOrderReposData = (data: any[]) =>
    data.map(({ id, name, html_url }: any) => ({
      id,
      name,
      url: html_url,
    }));

  useEffect(() => {
    fetchData({
      url: `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/details`,
      setIsLoading,
      setData: setUser,
      handleError: handleFetchError,
    });

    fetchData({
      url: `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/repos`,
      setIsLoading,
      setData: setRepos,
      reOrderData: reOrderReposData,
      handleError: handleFetchError,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Flex width="100%" flexDir={{ base: "column", lg: "row" }} gap={12}>
        <Flex grow={1} alignItems="center" flexDir="column">
          <Heading>User profile</Heading>
          <UserCard user={user?.data} isLoading={isLoading} />
        </Flex>
        <Flex grow={1} flexDir="column">
          <Heading>Listing all user repositories</Heading>
          <DisplayList data={repos?.data} isLoading={isLoading} />
          <Divider marginBlock={4} />

          <Link href="../" alignSelf="flex-end">
            <Button
              display="flex"
              alignItems="center"
              variant="solid"
              colorScheme="gray"
              fontSize="sm"
            >
              <Icon as={IoIosReturnLeft} marginRight={2} />
              Home
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
