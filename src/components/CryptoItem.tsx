import React from 'react'

interface CryptoItemProps {
  rank: number
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
}

// will be a good place to add formatting functions
// for now i'll just use the data without the formatting

function CryptoItem({ rank, symbol, name, price, change24h, marketCap, volume24h }: CryptoItemProps) {
    return (
      <div className="crypto-item">
        <div className="crypto-rank">#{rank}</div>
        <div className="crypto-info">
          <div className="crypto-symbol">{symbol}</div>
          <div className="crypto-name">{name}</div>
        </div>
        <div className="crypto-price">{price}</div>
        <div className="crypto-change">{change24h}</div>
        <div className="crypto-market-cap">{marketCap}</div>
        <div className="crypto-volume">{volume24h}</div>
      </div>
    )
  }
  
  export default CryptoItem 