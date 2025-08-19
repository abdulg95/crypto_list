import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders crypto tracker title', () => {
    render(<App />)
    
    expect(screen.getByText('Crypto List')).toBeInTheDocument()
  })

  it('renders description about top 10 cryptocurrencies', () => {
    render(<App />)
    
    expect(screen.getByText('Top 10 Cryptocurrencies by Market Cap')).toBeInTheDocument()
    expect(screen.getByText('Real-time data from CoinMarketCap API')).toBeInTheDocument()
  })

  it('renders main title with correct heading level', () => {
    render(<App />)
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Crypto List')
  })
}) 