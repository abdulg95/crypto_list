import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

// Mock environment variables before importing the service
vi.mock('import.meta.env', () => ({
  env: {
    VITE_COINMARKETCAP_API_KEY: 'test-api-key'
  }
}))

// Mock axios
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Import the service after mocking
import { coinMarketCapService } from '../coinmarketcap'

describe('CoinMarketCap Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTopCryptocurrencies', () => {
    it('should fetch top cryptocurrencies successfully', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              name: 'Bitcoin',
              symbol: 'BTC',
              slug: 'bitcoin',
              cmc_rank: 1,
              circulating_supply: 19500000,
              total_supply: 21000000,
              max_supply: 21000000,
              quote: {
                USD: {
                  price: 45000.50,
                  volume_24h: 25000000000,
                  percent_change_24h: 2.5,
                  market_cap: 850000000000,
                  last_updated: '2024-01-01T00:00:00Z'
                }
              }
            }
          ],
          status: {
            timestamp: '2024-01-01T00:00:00Z',
            error_code: 0,
            error_message: ''
          }
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await coinMarketCapService.getTopCryptocurrencies(1)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 1,
        rank: 1,
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 45000.50,
        change24h: 2.5,
        marketCap: 850000000000,
        volume24h: 25000000000
      })

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1&convert=USD',
        {
          headers: {
            'X-CMC_PRO_API_KEY': expect.any(String),
            'Accept': 'application/json'
          }
        }
      )
    })

    it('should handle API errors correctly', async () => {
      const mockResponse = {
        data: {
          data: [],
          status: {
            timestamp: '2024-01-01T00:00:00Z',
            error_code: 1001,
            error_message: 'Invalid API key'
          }
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      await expect(coinMarketCapService.getTopCryptocurrencies(10))
        .rejects.toThrow('Invalid API key')
    })

    it('should handle network errors correctly', async () => {
      const error = new Error('Network error')
      ;(error as any).response = { status: 500 }

      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(coinMarketCapService.getTopCryptocurrencies(10))
        .rejects.toThrow('Request failed: Network error')
    })

    it('should handle rate limit errors correctly', async () => {
      const error = new Error('Rate limit exceeded')
      ;(error as any).response = { status: 429 }

      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(coinMarketCapService.getTopCryptocurrencies(10))
        .rejects.toThrow('Request failed: Rate limit exceeded')
    })
  })

  describe('getCryptocurrencyDetails', () => {
    it('should fetch cryptocurrency details successfully', async () => {
      const mockResponse = {
        data: {
          data: {
            '1': {
              id: 1,
              name: 'Bitcoin',
              symbol: 'BTC',
              slug: 'bitcoin',
              cmc_rank: 1,
              circulating_supply: 19500000,
              total_supply: 21000000,
              max_supply: 21000000,
              quote: {
                USD: {
                  price: 45000.50,
                  volume_24h: 25000000000,
                  percent_change_24h: 2.5,
                  market_cap: 850000000000,
                  last_updated: '2024-01-01T00:00:00Z'
                }
              }
            }
          }
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await coinMarketCapService.getCryptocurrencyDetails(1)

      expect(result).toEqual({
        id: 1,
        rank: 1,
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 45000.50,
        change24h: 2.5,
        marketCap: 850000000000,
        volume24h: 25000000000
      })
    })

    it('should return null for non-existent cryptocurrency', async () => {
      const mockResponse = {
        data: {
          data: {}
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await coinMarketCapService.getCryptocurrencyDetails(999)

      expect(result).toBeNull()
    })
  })
}) 