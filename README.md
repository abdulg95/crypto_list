# Crypto List

A simple cryptocurrency tracking application that displays the top 10 cryptocurrencies using the CoinMarketCap API.

example payload from api 
https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
```
{
"data": [
{
"id": 1,
"name": "Bitcoin",
"symbol": "BTC",
"slug": "bitcoin",
"cmc_rank": 5,
"num_market_pairs": 500,
"circulating_supply": 16950100,
"total_supply": 16950100,
"max_supply": 21000000,
"infinite_supply": false,
"last_updated": "2018-06-02T22:51:28.209Z",
"date_added": "2013-04-28T00:00:00.000Z",
"tags": [
"mineable"
],
"platform": null,
"self_reported_circulating_supply": null,
"self_reported_market_cap": null,
"quote": {
"USD": {
"price": 9283.92,
"volume_24h": 7155680000,
"volume_change_24h": -0.152774,
"percent_change_1h": -0.152774,
"percent_change_24h": 0.518894,
"percent_change_7d": 0.986573,
"market_cap": 852164659250.2758,
"market_cap_dominance": 51,
"fully_diluted_market_cap": 952835089431.14,
"last_updated": "2018-08-09T22:53:32.000Z"
},
"BTC": {
"price": 1,
"volume_24h": 772012,
"volume_change_24h": 0,
"percent_change_1h": 0,
"percent_change_24h": 0,
"percent_change_7d": 0,
"market_cap": 17024600,
"market_cap_dominance": 12,
"fully_diluted_market_cap": 952835089431.14,
"last_updated": "2018-08-09T22:53:32.000Z"
}
}
},
{
"id": 1027,
"name": "Ethereum",
"symbol": "ETH",
"slug": "ethereum",
"num_market_pairs": 6360,
"circulating_supply": 16950100,
"total_supply": 16950100,
"max_supply": 21000000,
"infinite_supply": false,
"last_updated": "2018-06-02T22:51:28.209Z",
"date_added": "2013-04-28T00:00:00.000Z",
"tags": [
"mineable"
],
"platform": null,
"quote": {
"USD": {
"price": 1283.92,
"volume_24h": 7155680000,
"volume_change_24h": -0.152774,
"percent_change_1h": -0.152774,
"percent_change_24h": 0.518894,
"percent_change_7d": 0.986573,
"market_cap": 158055024432,
"market_cap_dominance": 51,
"fully_diluted_market_cap": 952835089431.14,
"last_updated": "2018-08-09T22:53:32.000Z"
},
"ETH": {
"price": 1,
"volume_24h": 772012,
"volume_change_24h": -0.152774,
"percent_change_1h": 0,
"percent_change_24h": 0,
"percent_change_7d": 0,
"market_cap": 17024600,
"market_cap_dominance": 12,
"fully_diluted_market_cap": 952835089431.14,
"last_updated": "2018-08-09T22:53:32.000Z"
}
}
}
],
"status": {
"timestamp": "2018-06-02T22:51:28.209Z",
"error_code": 0,
"error_message": "",
"elapsed": 10,
"credit_count": 1
}
}
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- CoinMarketCap API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd crypto_tracker2
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your CoinMarketCap API key to .env
```

4. Start development server
```bash
npm run dev
```

5. Run tests
```bash
npm test
```




## Testing

Run the test suite:
```bash
npm test
```

## License

MIT License 