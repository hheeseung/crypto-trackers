import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  const response = await axios.get(`${BASE_URL}/coins`);
  return response.data;
}

export async function fetchCoinInfo(coinId: string) {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
  return response.data;
}

export async function fetchCoinTickers(coinId: string) {
  const response = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  return response.data;
}

export async function fetchCoinHistory(coinId: string) {
  try {
    const response = await axios.get(
      `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
    );
    return response.data;
  } catch (error) {
    return;
  }
}
