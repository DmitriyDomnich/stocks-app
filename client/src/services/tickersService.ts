import axios from 'axios';
import { Tickers } from 'models/tickers/Tickers';
import { ChartTickerModel } from 'models/tickers/TickerModel';

export type TickerInterval = 'yday' | '5D' | '1M' | '6M';

interface APIResponse<T extends object> {
  success: boolean;
  error?: string;
  data?: T;
}
type APIRequest = {
  path: string;
  params?: URLSearchParams | Record<string, string>;
  method?: 'get' | 'post';
};
const BASE_API_URL = 'http://localhost:4000';

const performRequest = async <T extends object>({
  path,
  params,
  method = 'get',
}: APIRequest): Promise<APIResponse<T>> => {
  try {
    const response = await axios.request<T>({
      baseURL: BASE_API_URL,
      url: path,
      method,
      params,
    });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        data: response.data,
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

export const getTickersByTickerNames = async (
  observedTicker: Tickers
): Promise<APIResponse<ChartTickerModel[]>> => {
  const response = await performRequest<ChartTickerModel[]>({
    path: '/tickers',
    params: {
      ticker: observedTicker,
    },
  });
  return response;
};

export const getTickerDataByInterval = async (
  tickerName: Tickers,
  interval: TickerInterval
): Promise<APIResponse<ChartTickerModel[]>> => {
  const response = await performRequest<ChartTickerModel[]>({
    params: {
      ticker: tickerName,
      interval,
    },
    path: '/ticker',
  });
  return response;
};
