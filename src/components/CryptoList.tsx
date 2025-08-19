import React from 'react'
import CryptoItem from './CryptoItem'

// My idea here is that since we are getting a large amount of data from the api we should have a defined structure that will handle the data and display it in a list
// This will make it easier to add new features and ill also add loading handling and possibly pagination

interface Cryptocurrency {
  id: number
  rank: number
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
}

interface CryptoListProps {
  cryptocurrencies: Cryptocurrency[]
  loading?: boolean
  error?: string | null
}

function CryptoList({ cryptocurrencies, loading = false, error = null }: CryptoListProps) {
  if (loading) {
    return (
      <div className="crypto-list">
        <div className="loading">Loading cryptocurrencies...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="crypto-list">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  if (cryptocurrencies.length === 0) {
    return (
      <div className="crypto-list">
        <div className="empty">No cryptocurrencies found</div>
      </div>
    )
  }

  return (
    <div className="crypto-list">
      <div className="crypto-header">
        <div className="header-rank">Rank</div>
        <div className="header-info">Name</div>
        <div className="header-price">Price</div>
        <div className="header-change">24h Change</div>
        <div className="header-market-cap">Market Cap</div>
        <div className="header-volume">Volume (24h)</div>
      </div>
      {cryptocurrencies.map((crypto) => (
        <CryptoItem
          key={crypto.id}
          rank={crypto.rank}
          symbol={crypto.symbol}
          name={crypto.name}
          price={crypto.price}
          change24h={crypto.change24h}
          marketCap={crypto.marketCap}
          volume24h={crypto.volume24h}
        />
      ))}
    </div>
  )
}

export default CryptoList 