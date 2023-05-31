import React, { useState } from 'react';
import {
    ChakraProvider,
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    IconButton,
    Text,
    Box,
    Center,
    Heading,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { Formik, Field } from 'formik';
import axios from 'axios';

function App() {
    const [shortURL, setShortURL] = useState('');

    const generateShortURL = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/generate', values.longURL);
            setShortURL(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const copyToClipboard = (text) => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    return (
        <ChakraProvider>
            <Box bg="gray.300" minH="100vh">
                <Container maxW="sm" centerContent py={8}>
                    <Center mb={4}>
                        <Heading as="h1" size="xl" color="teal.500">
                            URL Shortener
                        </Heading>
                    </Center>
                    <Box bg="white" p={8} borderRadius="md" shadow="md">
                        <Formik initialValues={{ longURL: '' }} onSubmit={generateShortURL}>
                            {({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field name="longURL">
                                        {({ field }) => (
                                            <FormControl>
                                                <InputGroup size="md" mb={4}>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="Enter URL"
                                                        focusBorderColor="teal.800"
                                                    />
                                                    <InputRightElement width="6rem">
                                                        <Button size="sm" type="submit" colorScheme="teal">
                                                            Generate
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>
                                        )}
                                    </Field>
                                </form>
                            )}
                        </Formik>
                        {shortURL && (
                            <InputGroup size="md" mt={4}>
                                <Input
                                    type="text"
                                    value={shortURL}
                                    isReadOnly
                                    pr="4.5rem"
                                    focusBorderColor="teal.500"
                                />
                                <InputRightElement width="4.5rem">
                                    <IconButton
                                        aria-label="Copy URL"
                                        icon={<CopyIcon />}
                                        onClick={() => copyToClipboard(shortURL)}
                                        variant="ghost"
                                        size="sm"
                                        colorScheme="teal"
                                    />
                                </InputRightElement>
                            </InputGroup>
                        )}
                    </Box>
                </Container>
            </Box>
        </ChakraProvider>
    );
}

export default App;
