import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Flex } from "@chakra-ui/react";
import NextLink from "next/link"

const Login: React.FC<{}> = ({}) => {

  const router = useRouter();

  const [, login] = useLoginMutation();

  console.log(router)
  return (
    <Wrapper variant={"small"}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              // logged in
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="username or email"
              placeholder="username or email"
            ></InputField>
            <Box>
              <InputField
                name="password"
                label="password"
                placeholder="password"
                type="password"
              ></InputField>
            </Box>
            <Flex> 
              <NextLink href="/forgot-password">
              <Link ml="auto"> forgot password</Link>
              </NextLink>
            </Flex>
            <Button
              mt="4"
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Login);

