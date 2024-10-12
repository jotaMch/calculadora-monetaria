import { Flex } from '@chakra-ui/react';
import CurrencyConverter from './components/CurrencyConverter';
import { Header } from './components/Header';
import { Historical } from './components/Historical';
import { CurrencyProvider } from './CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
          <Header />
          <Flex flexDirection={{base: 'column', md: 'column', lg: 'row'}} justifyContent='space-between'>
            <CurrencyConverter/>
            <Historical />
          </Flex>
    </CurrencyProvider>
  );
}

export default App;
