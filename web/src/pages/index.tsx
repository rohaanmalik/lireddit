import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
  const [{ data, fetching }] = usePostsQuery({
    variables
  });
    return (
      <Layout>
        <Flex align="center">
          <Heading>LiReddit</Heading>
          <NextLink href="/create-post">
            <Link ml="auto"> create post </Link>
          </NextLink>
        </Flex>
        {!data && fetching ? (
          <div>...loading</div>
        ) : (
          <Stack>
            {data!.posts.map((p) => (
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            ))}
          </Stack>
        )}
        {data ? (
          <Flex>
            <Button onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.posts[data.posts.length - 1].createdAt,
                });
            }} 
            isLoading={fetching} m="auto" my={8}>
              load more
            </Button>
          </Flex>
        ) : null}
      </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
