import React from 'react'
import Header from './components/Header.tsx'
import CryptoList from './components/CryptoList.tsx'
import { fetchCryptoData } from './hooks/fetchCryptoData.ts'


function App() {
  const {
     data: cryptocurrencies,
     isLoading,
     error,
     refetch
     } = fetchCryptoData(10)

     const handleRetry = () => {
      refetch()
     }

  return (
    <div className="app">
      <Header 
        title="Crypto List" 
        subtitle="Top 10 Cryptocurrencies by Market Cap" 
      />
      <main className="main-content">
        <CryptoList 
            cryptocurrencies={cryptocurrencies || []}
            loading={isLoading}
            error={error?.message || null}
            onRetry={handleRetry}
          />
      </main>
    </div>
  )
}

export default App 