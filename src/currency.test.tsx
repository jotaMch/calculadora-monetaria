import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CurrencyContext } from "./CurrencyContext";
import CurrencyConverter from "./components/CurrencyConverter";

global.fetch = jest.fn(() =>
  Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
          success: true,
          rates: {
              USD: 1.2,
              EUR: 1.0,
          },
      }),
  })
) as jest.Mock;

describe("CurrencyConverter", () => {
  
  test("deve chamar a API no useEffect e atualizar as taxas", async () => {
      const mockSetRates = jest.fn();
      const contextValue = {
          rates: null,
          setRates: mockSetRates,
          fromCurrency: "",
          toCurrency: "",
          amount: 0,
          convertedValue: null,
          setFromCurrency: jest.fn(),
          setToCurrency: jest.fn(),
          setAmount: jest.fn(),
          setConvertedValue: jest.fn(),
      };

      render(
          <CurrencyContext.Provider value={contextValue}>
              <CurrencyConverter />
          </CurrencyContext.Provider>
      );

      await waitFor(() => {
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(mockSetRates).toHaveBeenCalledWith({ USD: 1.2, EUR: 1.0 });
      });
  });

  test("deve exibir erro ao falhar na chamada da API", async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({
              ok: false,
              json: () => Promise.resolve({
                  success: false,
                  error: { info: "Erro de API" },
              }),
          })
      );

      const contextValue = {
          rates: null,
          setRates: jest.fn(),
          fromCurrency: "",
          toCurrency: "",
          amount: 0,
          convertedValue: null,
          setFromCurrency: jest.fn(),
          setToCurrency: jest.fn(),
          setAmount: jest.fn(),
          setConvertedValue: jest.fn(),
      };

      render(
          <CurrencyContext.Provider value={contextValue}>
              <CurrencyConverter />
          </CurrencyContext.Provider>
      );

  });
});