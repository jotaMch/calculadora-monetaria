import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, Button } from "@chakra-ui/react";

export const Historical: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [conversionHistory, setConversionHistory] = useState<Array<any>>([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('conversionHistory');
        if (storedHistory) {
            setConversionHistory(JSON.parse(storedHistory));
        }
        
        // Recupera o estado de 'isOpen' do localStorage
        const storedIsOpen = localStorage.getItem('isOpen');
        if (storedIsOpen) {
            setIsOpen(storedIsOpen === 'true');
        }
    }, []);

    const handleClick = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);        
        // Armazena o novo estado de 'isOpen' no localStorage
        localStorage.setItem('isOpen', newIsOpen.toString());

        window.location.reload();
    };

    return (
        <Flex flexDirection="column" align="start" m="20px">
            <Text fontWeight="bold">Histórico de conversões</Text>
            <Button colorScheme="teal" my={5} onClick={handleClick}>
                {isOpen ? "Fechar visualização" : "Visualizar"}
            </Button>
            {isOpen && (
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    padding="4"
                    boxShadow="md"
                    bg="white"
                    maxW="100%"
                    mt="4"
                >
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>De</Th>
                                <Th>Para</Th>
                                <Th>Quantidade</Th>
                                <Th>Valor Convertido</Th>
                                <Th>Data</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {conversionHistory.map((conversion, index) => (
                                <Tr key={index}>
                                    <Td>{conversion.fromCurrency}</Td>
                                    <Td>{conversion.toCurrency}</Td>
                                    <Td>{conversion.amount}</Td>
                                    <Td>{conversion.convertedValue.toFixed(2)}</Td>
                                    <Td>{conversion.date}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </Flex>
    );
};
