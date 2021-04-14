import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {

    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
      <Wrapper variant={"small"}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                {" "}
                we have sent you an email, if that account exists with us{" "}
              </Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  label="Email"
                  placeholder="email"
                ></InputField>
                <Button
                  mt="4"
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="teal"
                >
                  Forgot Password
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);