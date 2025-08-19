import React from 'react'
import Header from './components/Header.tsx'
import CryptoList from './components/CryptoList.tsx'

// mock values from api that i want do display
const mockCryptocurrencies = [
  {
    id: 1,
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 45000.50,
    change24h: 2.5,
    marketCap: 850000000000,
    volume24h: 25000000000,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1.png'
  },
  {
    id: 2,
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3200.75,
    change24h: -1.2,
    marketCap: 380000000000,
    volume24h: 18000000000,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png'
  }
]

function App() {
  return (
    <div className="app">
      <Header 
        title="Crypto Tracker" 
        subtitle="Top 10 Cryptocurrencies by Market Cap" 
      />
      <main className="main-content">
        <CryptoList cryptocurrencies={mockCryptocurrencies} />
      </main>
    </div>
  )
}

export default App 