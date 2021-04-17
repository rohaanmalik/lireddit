import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";


const CreatePost: React.FC<{}> = ({}) => {

    const [,createPost] = useCreatePostMutation();
    useIsAuth();
    const router = useRouter();

    return (
      <Layout variant="small">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const error = await createPost(values);
            if (!error){
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                label="Title"
                placeholder="Title"
              ></InputField>
              <Box>
                <InputField
                  textArea
                  name="text"
                  label="Text"
                  placeholder="...text"
                  type="Body"
                ></InputField>
              </Box>
              <Button
                mt="4"
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                {" "}
                create post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);