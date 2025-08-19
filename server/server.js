const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const COINMARKETCAP_BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

async function makeCoinMarketCapRequest(endpoint, params = {}) {
  try {
    const response = await axios.get(`${COINMARKETCAP_BASE_URL}${endpoint}`, {
      params: {
        ...params,
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('CoinMarketCap API error:', error.response?.data || error.message);
    throw error;
  }
}

app.get('/api/cryptocurrencies', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await makeCoinMarketCapRequest('/cryptocurrency/listings/latest', { limit });
    
    const cryptocurrencies = data.data.map(item => ({
      id: item.id,
      rank: item.cmc_rank,
      symbol: item.symbol,
      name: item.name,
      price: item.quote.USD.price,
      change24h: item.quote.USD.percent_change_24h,
      marketCap: item.quote.USD.market_cap,
      volume24h: item.quote.USD.volume_24h,
      image: `https://s2.coinmarketcap.com/static/img/coins/200x200/${item.id}.png`
    }));
    
    res.json(cryptocurrencies);
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    res.status(500).json({ 
      error: 'Failed to fetch cryptocurrencies',
      details: error.response?.data || error.message 
    });
  }
});

app.get('/api/cryptocurrencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await makeCoinMarketCapRequest('/cryptocurrency/quotes/latest', { id });
    
    if (!data.data || !data.data[id]) {
      return res.status(404).json({ error: 'Cryptocurrency not found' });
    }
    
    const item = data.data[id];
    const cryptocurrency = {
      id: item.id,
      rank: item.cmc_rank,
      symbol: item.symbol,
      name: item.name,
      price: item.quote.USD.price,
      change24h: item.quote.USD.percent_change_24h,
      marketCap: item.quote.USD.market_cap,
      volume24h: item.quote.USD.volume_24h,
      logo: `https://s2.coinmarketcap.com/static/img/coins/200x200/${item.id}.png`
    };
    
    res.json(cryptocurrency);
  } catch (error) {
    console.error('Error fetching cryptocurrency details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch cryptocurrency details',
      details: error.response?.data || error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Crypto backend server running on port ${PORT}`);
}); 