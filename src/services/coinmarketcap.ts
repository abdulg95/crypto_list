import axios from 'axios'

// Types fromCoinMarketCap API response
//I had to break this down because its a very long json object
// and i wanted to make it more readable

interface CoinMarketCapQuote {
  USD: {
    price: number
    volume_24h: number
    percent_change_24h: number
    market_cap: number
    last_updated: string
  }
}

interface CoinMarketCapCrypto {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  quote: CoinMarketCapQuote
}

interface CoinMarketCapResponse {
  data: CoinMarketCapCrypto[]
  status: {
    timestamp: string
    error_code: number
    error_message: string
  }
}

// Transform CoinMarketCap data to our app's format
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

// this service class does the actual fetching
// i didn't use my env file properly and spent 20 minutes trying to figure out why it wasn't working
// so there is a log letting you know if api key is not found

class CoinMarketCapService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = import.meta.env.VITE_COINMARKETCAP_API_KEY
    this.baseUrl = 'https://pro-api.coinmarketcap.com/v1'
    
    if (!this.apiKey) {
      console.warn('CoinMarketCap API key not found. Please set VITE_COINMARKETCAP_API_KEY in your .env file')
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    if (!this.apiKey) {
      throw new Error('CoinMarketCap API key not configured')
    }

    try {
      const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
          'Accept': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.')
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.')
        }
        throw new Error(`API request failed: ${error.response?.data?.status?.error_message || error.message}`)
      }
      throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getTopCryptocurrencies(limit: number = 10): Promise<Cryptocurrency[]> {
    try {
      const response = await this.makeRequest<CoinMarketCapResponse>(
        `/cryptocurrency/listings/latest?limit=${limit}&convert=USD`
      )

      if (response.status.error_code !== 0) {
        throw new Error(response.status.error_message)
      }

      return response.data.map(crypto => ({
        id: crypto.id,
        rank: crypto.cmc_rank,
        symbol: crypto.symbol,
        name: crypto.name,
        price: crypto.quote.USD.price,
        change24h: crypto.quote.USD.percent_change_24h,
        marketCap: crypto.quote.USD.market_cap,
        volume24h: crypto.quote.USD.volume_24h
      }))
    } catch (error) {
      console.error('Failed to fetch top cryptocurrencies:', error)
      throw error
    }
  }

  async getCryptocurrencyDetails(id: number): Promise<Cryptocurrency | null> {
    try {
      const response = await this.makeRequest<{ data: { [key: string]: CoinMarketCapCrypto } }>(
        `/cryptocurrency/quotes/latest?id=${id}&convert=USD`
      )

      const crypto = response.data[id]
      if (!crypto) {
        return null
      }

      return {
        id: crypto.id,
        rank: crypto.cmc_rank,
        symbol: crypto.symbol,
        name: crypto.name,
        price: crypto.quote.USD.price,
        change24h: crypto.quote.USD.percent_change_24h,
        marketCap: crypto.quote.USD.market_cap,
        volume24h: crypto.quote.USD.volume_24h
      }
    } catch (error) {
      console.error(`Failed to fetch cryptocurrency details for ID ${id}:`, error)
      throw error
    }
  }
}

export const coinMarketCapService = new CoinMarketCapService()
export type { Cryptocurrency } 