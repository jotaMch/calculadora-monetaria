import { render, screen } from "@testing-library/react";
import CurrencyConverter from "./components/CurrencyConverter";

test("Deve verificar nome", async () => {
  render(<CurrencyConverter />);
  const element1 = screen.getAllByAltText('Valor a ser convertido')
  expect(element1)
});
