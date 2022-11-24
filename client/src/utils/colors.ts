import { Tickers } from 'models/tickers/Tickers';

export const tickerColorsMap: Record<Tickers, string> & {
  getColor: (ticker: Tickers) => string;
} = {
  AMZN: '#C33764',
  AAPL: '#928dab',
  FB: '#A770EF',
  GOOGL: '#43C6AC',
  MSFT: '#6190E8',
  TSLA: '#F3904F',
  getColor: function (ticker: Tickers) {
    return this[ticker];
  },
};
