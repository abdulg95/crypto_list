import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders crypto tracker title', () => {
    render(<App />)
    
    expect(screen.getByText('Crypto Tracker')).toBeInTheDocument()
  })

  it('renders description about top 10 cryptocurrencies', () => {
    render(<App />)
    
    expect(screen.getByText('Top 10 Cryptocurrencies by Market Cap')).toBeInTheDocument()
  })

  it('renders cryptocurrency list', () => {
    render(<App />)
    
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
  })

  it('renders main title with correct heading level', () => {
    render(<App />)
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Crypto Tracker')
  })

  it('displays cryptocurrency data correctly', () => {
    render(<App />)
    
    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('ETH')).toBeInTheDocument()
    expect(screen.getByText('45000.5')).toBeInTheDocument()
    expect(screen.getByText('3200.75')).toBeInTheDocument()
  })
}) 