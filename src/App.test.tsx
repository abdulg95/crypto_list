import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'
import * as fetchCryptoData from './hooks/fetchCryptoData'

vi.mock('./hooks/fetchCryptoData', () => ({
  fetchCryptoData: vi.fn(),
}))

vi.mock('./components/CryptoList', () => ({
  default: ({ cryptocurrencies, loading, error }: any) => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!cryptocurrencies.length) return <div>No cryptocurrencies</div>
    
    return (
      <div>
        {cryptocurrencies.map((crypto: any) => (
          <div key={crypto.id}>
            {crypto.symbol} - {crypto.name}
          </div>
        ))}
      </div>
    )
  }
}))

describe('App', () => {
  const mockUseCryptocurrencies = vi.mocked(fetchCryptoData.fetchCryptoData)

  it('renders crypto tracker title', () => {

    mockUseCryptocurrencies.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    })

    render(<App />)
    
    expect(screen.getByText('Crypto List')).toBeInTheDocument()
  })

  it('renders description about top 10 cryptocurrencies', () => {
    mockUseCryptocurrencies.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    })
    render(<App />)
    
    expect(screen.getByText('Top 10 Cryptocurrencies by Market Cap')).toBeInTheDocument()
  })

  it('renders cryptocurrency list when data is loaded', () => {
    const mockCryptocurrencies = [
      { id: 1, symbol: 'BTC', name: 'Bitcoin' },
      { id: 2, symbol: 'ETH', name: 'Ethereum' }
    ]

    mockUseCryptocurrencies.mockReturnValue({
      data: mockCryptocurrencies,
      isLoading: false,
      error: null
    })

    render(<App />)

    expect(screen.getByText('BTC - Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('ETH - Ethereum')).toBeInTheDocument()


  })

  it('renders main title with correct heading level', () => {
    render(<App />)
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Crypto List')
  })

  it('displays cryptocurrency data correctly', () => {
    render(<App />)
    
    expect(screen.getByText('BTC - Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('ETH - Ethereum')).toBeInTheDocument()
  })
}) 