import { useQuery } from '@tanstack/react-query'
import { coinMarketCapService } from '../services/coinmarketcap'
import type { Cryptocurrency } from '../services/coinmarketcap'

//  here i'm using the useQuery hook to fetch the data from the api
// I originilly had everything with the axios fetch but i wanted to try out the useQuery hook suggested by the instructions docs

export function fetchCryptoData(limit: number = 10) {
  return useQuery({
    queryKey: ['cryptocurrencies', limit],
    queryFn: () => coinMarketCapService.getTopCryptocurrencies(limit),
    staleTime: 5 * 60 * 1000, 
    refetchInterval: 30 * 1000, 
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function fetchCryptocurrencyDetails(id: number) {
  return useQuery({
    queryKey: ['cryptocurrency', id],
    queryFn: () => coinMarketCapService.getCryptocurrencyDetails(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, 
    refetchInterval: 15 * 1000, 
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Hook for getting a single cryptocurrency by ID from the list
export function fetchCryptocurrencyFromList(id: number, cryptocurrencies: Cryptocurrency[]) {
  return cryptocurrencies.find(crypto => crypto.id === id)
} 