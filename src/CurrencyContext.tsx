import { createContext, useContext, useState, ReactNode } from "react";


interface CurrencyContextValue {
    rates: Record<string, number> | null;
    fromCurrency: string;
    toCurrency: string;
    amount: number | "";
    convertedValue: number | null;
    setRates: (rates: Record<string, number>) => void;
    setFromCurrency: (currency: string) => void;
    setToCurrency: (currency: string) => void;
    setAmount: (amount: number | "") => void;
    setConvertedValue: (value: number | null) => void;
}

export const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [fromCurrency, setFromCurrency] = useState<string>("");
    const [toCurrency, setToCurrency] = useState<string>("");
    const [amount, setAmount] = useState<number | "">("");
    const [convertedValue, setConvertedValue] = useState<number | null>(null);

    return (
        <CurrencyContext.Provider
            value={{
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
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency deve ser usado dentro de um CurrencyProvider");
    }
    return context;
};
