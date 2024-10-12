import React, { useState } from "react";
import { useCurrency } from "../CurrencyContext"; 
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, Button } from "@chakra-ui/react";

export const Historical: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { fromCurrency, toCurrency, amount, convertedValue } = useCurrency();

    const handleClick = () => {
        setIsOpen( prev => !prev )
    }
    return (
        <Flex flexDirection='column' align='start' m='20px'>
            <Text fontWeight='bold' >Histórico de conversões</Text>
            <Button colorScheme="teal" my={5} onClick={handleClick}>Vizualizar</Button>
            {isOpen && (
                <Box
                borderWidth="1px"
                borderRadius="lg"
                padding="4"
                boxShadow="md"
                bg="white"
                maxW="sm"
                mt="4"
                >
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Descrição</Th>
                                <Th>Valor</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>De</Td>
                                <Td>{fromCurrency}</Td>
                            </Tr>
                            <Tr>
                                <Td>Para</Td>
                                <Td>{toCurrency}</Td>
                            </Tr>
                            <Tr>
                                <Td>Quantidade</Td>
                                <Td>{amount}</Td>
                            </Tr>
                                <Tr>
                                    <Td fontWeight="bold">Valor Convertido</Td>
                                    <Td fontWeight="bold">{convertedValue}</Td>
                                </Tr>
                        </Tbody>
                    </Table>
                </Box>
            )}
            
        </Flex>
    );
};
