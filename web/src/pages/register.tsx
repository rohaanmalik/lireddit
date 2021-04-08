import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useMutation  } from "urql";
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {}


const Register: React.FC<registerProps> = ({ }) => {
  // const [,register] = useMutation(REGISTER_MUT); // 1st obj is something to do with mutation,2nd var is of our choice
  const [,register] = useRegisterMutation(); 
 return (
   <Wrapper variant={"small"}>
     <Formik
       initialValues={{ username: "", password: "" }}
       onSubmit={async (values , {setErrors}) => {
         const response = await register(values);
         if (response.data?.register.errors){
          setErrors({
            username:"hey i am an error "
          })
         }
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <InputField
             name="username"
             label="username"
             placeholder="username"
           ></InputField>
           <Box>
             <InputField
               name="password"
               label="password"
               placeholder="password"
               type="password"
             ></InputField>
           </Box>
           <Button
             mt="4"
             isLoading={isSubmitting}
             type="submit"
             colorScheme="teal"
           >
             register
           </Button>
         </Form>
       )}
     </Formik>
   </Wrapper>
 );
}


export default Register