import axios from 'axios'

export interface Cryptocurrency {
  id: number
  rank: number
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  logo: string
}

const BACKEND_BASE_URL = 'http://localhost:3001/api'

class CoinMarketCapService {
  async getTopCryptocurrencies(limit: number = 10): Promise<Cryptocurrency[]> {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/cryptocurrencies`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch top cryptocurrencies:', error)
      throw new Error('Failed to fetch cryptocurrencies')
    }
  }

  async getCryptocurrencyDetails(id: number): Promise<Cryptocurrency | null> {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/cryptocurrencies/${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null
      }
      console.error('Failed to fetch cryptocurrency details:', error)
      throw new Error('Failed to fetch cryptocurrency details')
    }
  }
}

export const coinMarketCapService = new CoinMarketCapService() 