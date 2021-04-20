import { NextPage } from 'next';
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useChangePasswordMutation } from '../../generated/graphql';
import NextLink from "next/link"

const ChangePassword: NextPage = () => {

  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant={"small"}>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // logged in
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="newPassword"
                label="new password"
                placeholder="New Password"
                type="password"
              ></InputField>
              {tokenError ? (
                <Flex mt={2}>
                  <Box mr={2} color="red">
                    {tokenError}
                    <NextLink href="/forgot-password">go for it again</NextLink>
                  </Box>
                </Flex>
              ) : null}
              <Button
                mt="4"
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                new password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword); 