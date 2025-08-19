
I ran in to cors issues Express.js backend server was the fastest way i could remember how to fix that so i use this to handle CoinMarketCap API requests 

## Setup

1. 
   ```bash
   cd server
   npm install
   ```

2. 
   ```bash
   cp env.example .env
   #Add your own api key 
   ```

3. **Start the server:**
   ```bash
   npm run dev

## API Endpoints

- `GET /api/cryptocurrencies?limit=10` - Get top cryptocurrencies
- `GET /api/cryptocurrencies/:id` - Get specific cryptocurrency details

