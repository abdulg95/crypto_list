import React from 'react'

interface CryptoItemProps {
  rank: number
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  image?: string
}

// will be a good place to add formatting functions
// for now i'll just use the data without the formatting

function CryptoItem({ rank, symbol, name, price, change24h, marketCap, volume24h, image }: CryptoItemProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(price)
      }
    
      const formatChange = (change: number) => {
        const sign = change >= 0 ? '+' : ''
        const color = change >= 0 ? 'positive' : 'negative'
        return (
          <span className={`change ${color}`}>
            {sign}{change.toFixed(2)}%
          </span>
        )
      }
    
      const formatMarketCap = (marketCap: number) => {
        if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
        if (marketCap >= 1e3) return `$${(marketCap / 1e3).toFixed(0)}K`
        return `$${marketCap.toFixed(0)}`
      }
    
    return (
      <div className="crypto-item">
        <div className="crypto-rank">#{rank}</div>
        <div className="crypto-info">
        <div className="crypto-symbol-row">
          {image && (
            <img 
              src={image} 
              alt={`${name} logo`} 
              className="crypto-logo"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          )}
          <div className="crypto-symbol">{symbol}</div>
        </div>
          <div className="crypto-name">{name}</div>
        </div>
        <div className="crypto-price">{formatPrice(price)}</div>
        <div className="crypto-change">{formatChange(change24h)}</div>
        <div className="crypto-market-cap">{formatMarketCap(marketCap)}</div>
        <div className="crypto-volume">{formatMarketCap(volume24h)}</div>
      </div>
    )
  }
  
  export default CryptoItem 