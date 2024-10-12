import React, { useEffect } from "react";
import { Button, FormControl, FormLabel, Select, Input, Text, Box } from "@chakra-ui/react";
import { useCurrency } from "../CurrencyContext";

const CurrencyConverter: React.FC = () => {
    const {
        rates,
        fromCurrency,
        toCurrency,
        amount,
        convertedValue,
        setRates,
        setFromCurrency,
        setToCurrency,
        setAmount,
        setConvertedValue,
    } = useCurrency();
    const fetchRates = async () => {
        try {
            const savedRates = localStorage.getItem("exchangeRates");
            const savedTimestamp = localStorage.getItem("timestamp");
            const now = new Date().getTime();
    
            if (savedRates && savedTimestamp) {
                setRates(JSON.parse(savedRates));
            } else {
                const response = await fetch("http://data.fixer.io/api/latest?access_key=d9c5ff35a435f8b7d020965ce1f10412");
                if (!response.ok) throw new Error("Erro ao buscar os dados da API");
    
                const data = await response.json();
                if (!data.success) throw new Error(data.error.info);
    
                localStorage.setItem("exchangeRates", JSON.stringify(data.rates));
                localStorage.setItem("timestamp", now.toString());
                setRates(data.rates);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(`Ocorreu um erro: ${error.message}`);
            } else {
                alert("Ocorreu um erro desconhecido.");
            }
        }
    };
    
    useEffect(() => {
        fetchRates();
    }, []);

    const handleConvert = () => {
        if (fromCurrency && toCurrency && rates && amount) {
            const fromRate = rates[fromCurrency];
            const toRate = rates[toCurrency];

            if (fromRate && toRate) {
                const conversionRate = toRate / fromRate;
                setConvertedValue(Number(amount) * conversionRate);
            }
        } else {
            alert("Selecione ambas as moedas e insira um valor para realizar a conversão.");
        }
    };

    return (
        <Box w='70%' m='20px'>
            {rates ? (
                <FormControl>
                    <FormLabel>Valor a ser convertido</FormLabel>
                    <Input
                        type="number"
                        placeholder="Digite o valor"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value) || "")}
                    />
                    <FormLabel>Selecione a moeda que será convertida</FormLabel>
                    <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {Object.entries(rates).map(([currency, rate], index) => (
                            <option key={index} value={currency}>
                                {currency}: {rate}
                            </option>
                        ))}
                    </Select>
                    <FormLabel>Selecione a moeda de conversão</FormLabel>
                    <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {Object.entries(rates).map(([currency, rate], index) => (
                            <option key={index} value={currency}>
                                {currency}: {rate}
                            </option>
                        ))}
                    </Select>
                    <Button colorScheme="teal" onClick={handleConvert} mt={4}>
                        Converter
                    </Button>

                    {convertedValue !== null && (
                        <Text mt={4}>
                            Valor convertido: {convertedValue.toFixed(2)} {toCurrency}
                        </Text>
                    )}
                </FormControl>
            ) : (
                <p>Carregando taxas de câmbio...</p>
            )}
        </Box>
    );
};

export default CurrencyConverter;
