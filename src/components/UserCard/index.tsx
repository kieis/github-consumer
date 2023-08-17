import { formatDate } from "@/utils";
import { Avatar, Flex, Icon, Link, Spinner, Text } from "@chakra-ui/react";
import { PiHashFill } from "react-icons/pi";

export type UserDetailData = {
  id: number;
  login: string;
  html_url: string;
  created_at: string;
  name: string;
  avatar_url: string;
};

interface Props {
  user: UserDetailData | undefined;
  isLoading: boolean;
}

export function UserCard({ user, isLoading }: Props) {
  if (isLoading) {
    return (<Spinner color="green.400" />);
  }

  return (
    <Link href={user?.html_url} maxW={80}>
      <Flex
        flexDir="column"
        alignItems="center"
        bgColor="gray.200"
        padding={8}
        borderRadius="3xl"
      >
        <Avatar
          src={user?.avatar_url}
          name={user?.login}
          size="2xl"
          border="2px solid #326b5d"
          padding={0.5}
          marginBottom={4}
        />
        <Flex alignItems="center">
          <Text fontWeight="bold" marginRight={0.5}>
            {user?.login}
          </Text>

          <Text
            fontWeight="bold"
            fontSize={10}
            display="flex"
            alignItems="center"
            paddingBlock={0.5}
          >
            <Icon as={PiHashFill} boxSize={4} />
            {user?.id}
          </Text>
        </Flex>
        <Text
          fontWeight="semibold"
          fontSize={12}
          textTransform="uppercase"
          fontStyle="italic"
        >
          Since:{" "}
          {user &&
            formatDate(user.created_at, {
              year: "numeric",
              day: "2-digit",
              month: "long",
            })}
        </Text>
      </Flex>
    </Link>
  );
}
