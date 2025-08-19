import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

vi.mock('../../services/coinmarketcap', () => ({
  coinMarketCapService: {
    getTopCryptocurrencies: vi.fn(),
    getCryptocurrencyDetails: vi.fn()
  }
}))

import { fetchCryptoData, fetchCryptocurrencyDetails, fetchCryptocurrencyFromList } from '../../hooks/fetchCryptoData'
import { coinMarketCapService } from '../../services/coinmarketcap'

const mockService = coinMarketCapService as any

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('fetchCryptoData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch cryptocurrencies successfully', async () => {
    const mockCryptocurrencies = [
      {
        id: 1,
        rank: 1,
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 45000.50,
        change24h: 2.5,
        marketCap: 850000000000,
        volume24h: 25000000000
      }
    ]

    mockService.getTopCryptocurrencies.mockResolvedValueOnce(mockCryptocurrencies)

    const { result } = renderHook(() => fetchCryptoData(10), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockCryptocurrencies)
    expect(mockService.getTopCryptocurrencies).toHaveBeenCalledWith(10)
  })

  it('should handle errors correctly', async () => {
    const error = new Error('API Error')
    mockService.getTopCryptocurrencies.mockRejectedValueOnce(error)

    const { result } = renderHook(() => fetchCryptoData(10), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    }, { timeout: 5000 })

    expect(result.current.error).toBeTruthy()
    expect(result.current.error?.message).toContain('data is undefined')
  })

  it('should use default limit of 10', async () => {
    const mockCryptocurrencies = []
    mockService.getTopCryptocurrencies.mockResolvedValueOnce(mockCryptocurrencies)

    const { result } = renderHook(() => fetchCryptoData(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockService.getTopCryptocurrencies).toHaveBeenCalledWith(10)
  })
})

describe('fetchCryptocurrencyDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch cryptocurrency details successfully', async () => {
    const mockCryptocurrency = {
      id: 1,
      rank: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 45000.50,
      change24h: 2.5,
      marketCap: 850000000000,
      volume24h: 25000000000
    }

    mockService.getCryptocurrencyDetails.mockResolvedValueOnce(mockCryptocurrency)

    const { result } = renderHook(() => fetchCryptocurrencyDetails(1), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockCryptocurrency)
    expect(mockService.getCryptocurrencyDetails).toHaveBeenCalledWith(1)
  })

  it('should handle null response correctly', async () => {
    mockService.getCryptocurrencyDetails.mockResolvedValueOnce(null)

    const { result } = renderHook(() => fetchCryptocurrencyDetails(999), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toBeNull()
  })
})
