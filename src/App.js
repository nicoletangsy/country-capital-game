import './App.css';
import CountryCapitalGame from './pages/countryCapitalGame';

function App() {
  const data = {
    'Poland': 'Warsaw',
    'Germany': 'Berlin',
    'Azerbaijan': 'Baku',
    'Papua New Guinea': 'Port Moresby',
  }

  return (
    <div className="App">
      <CountryCapitalGame data={data} />
    </div>
  );
}

export default App;
