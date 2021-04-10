import { Flex, Box} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
    console.log(useMeQuery());
  // data is loading
  if (fetching) {
  }
  // user is not logged in
  else if (!data?.me) {
    body = (
      <>
        <Flex bg="tomato" ml={"auto"} p={4}>
          <Box ml={"auto"}>
            <NextLink href="/login"> login </NextLink>
            <NextLink href="/register"> register </NextLink>
          </Box>
        </Flex>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box ml={"auto"} mr={2}>{data.me.username}</Box>
        <Button variant="link"> logout </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" ml={"auto"} p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
