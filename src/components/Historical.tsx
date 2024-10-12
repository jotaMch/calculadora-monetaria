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
        
        // Recuperar o estado de 'isOpen' do localStorage
        const storedIsOpen = localStorage.getItem('isOpen');
        if (storedIsOpen) {
            setIsOpen(storedIsOpen === 'true');
        }
    }, []);

    // Função para abrir/fechar a visualização
    const handleToggleView = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        localStorage.setItem('isOpen', newIsOpen.toString());
    };

    // Função para atualizar os dados do histórico
    const handleUpdateHistory = () => {
        const storedHistory = localStorage.getItem('conversionHistory');
        if (storedHistory) {
            setConversionHistory(JSON.parse(storedHistory));
        }
    };

    return (
        <Flex flexDirection="column" align="start" m="20px" w={{base: '100%', md: '100%', lg: '50%'}}>
            <Text fontWeight="bold">Histórico de conversões</Text>
            <Flex gap={4}>
                <Button colorScheme="teal" variant='solid' my={5} onClick={handleToggleView}>
                    {isOpen ? "Fechar visualização" : "Visualizar"}
                </Button>

                <Button colorScheme="teal" variant='outline' my={5} onClick={handleUpdateHistory}>
                    Atualizar histórico
                </Button>
            </Flex>
            

            {isOpen && (
                <Box
                borderWidth="1px"
                borderRadius="lg"
                padding="4"
                boxShadow="md"
                bg="white"
                maxW="100%"
                mt="4"
                overflowX="auto" // Permite rolagem horizontal em telas menores
                >
                    <Table variant="simple" minWidth="600px">
                    
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
