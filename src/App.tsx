import CurrencyConverter from './components/CurrencyConverter';
import { Header } from './components/Header';
import { Historical } from './components/Historical';
import { CurrencyProvider } from './CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
          <Header />
          <CurrencyConverter/>
          <Historical />
    </CurrencyProvider>
  );
}

export default App;
