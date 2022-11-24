import { SortFieldsType } from 'components/WatchingGroups/GroupSortSelect';
import { TickerModel } from 'models/tickers/TickerModel';
import { Tickers } from '../models/tickers/Tickers';

const tickerNamesMap: Record<Tickers, string> = {
  AAPL: 'Apple',
  AMZN: 'Amazon',
  FB: 'Facebook',
  GOOGL: 'Alphabet',
  MSFT: 'Microsoft',
  TSLA: 'Tesla',
};

export const tickerToTickerName = (ticker: Tickers) => {
  return tickerNamesMap[ticker];
};

export const getSortFunction = (
  sortField: SortFieldsType,
  sortOrder: 'asc' | 'desc'
) => {
  switch (sortField) {
    case 'ticker':
      return (aTicker: TickerModel, bTicker: TickerModel) => {
        const a = aTicker.ticker,
          b = bTicker.ticker;
        return sortOrder === 'desc'
          ? a > b
            ? 1
            : a < b
            ? -1
            : 0
          : a < b
          ? 1
          : a > b
          ? -1
          : 0;
      };
    default:
      return (aTicker: TickerModel, bTicker: TickerModel) => {
        const a = aTicker[sortField],
          b = bTicker[sortField];
        return sortOrder === 'asc' ? a - b : b - a;
      };
  }
};
