import axios from 'axios';
import { Tickers } from 'models/tickers/Tickers';
import { ChartTickerModel } from 'models/tickers/TickerModel';

export type TickerInterval = 'yday' | '5D' | '1M' | '6M';

export interface APIResponse<T extends object> {
  success: boolean;
  error?: string;
  response?: T;
}
const BASE_API_URL = 'http://localhost:4000';

export const getTickerDataByInterval = async (
  tickerName: Tickers,
  interval: TickerInterval
): Promise<APIResponse<ChartTickerModel[]>> => {
  try {
    const response = await axios.get<ChartTickerModel[]>(
      `${BASE_API_URL}/ticker`,
      {
        params: {
          ticker: tickerName,
          interval,
        },
      }
    );
    if (response.status === 200 && response.data) {
      return {
        success: true,
        response: response.data,
      };
    }
    return {
      success: false,
      error: 'Something went wrong',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
};
