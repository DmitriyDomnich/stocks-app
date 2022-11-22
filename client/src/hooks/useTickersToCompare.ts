import { ChartTickerModel } from 'models/tickers/TickerModel';
import { Tickers } from 'models/tickers/Tickers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as TickersService from 'services/tickersService';

type TickersState = {
  loading: boolean;
  error: string | undefined;
  data: null | ChartTickerModel[];
};

export const useTickersToCompare = () => {
  const { ticker } = useParams();
  const [tickers, setTickers] = useState<TickersState>({
    loading: false,
    error: undefined,
    data: null,
  });
  useEffect(() => {
    setTickers((prev) => ({ ...prev, error: undefined, loading: true }));
    TickersService.getTickersByTickerNames(ticker as Tickers).then(
      ({ success, data, error }) => {
        if (success && data) {
          setTickers({
            data,
            error: undefined,
            loading: false,
          });
        } else {
          setTickers((prev) => ({
            ...prev,
            error: error,
            loading: false,
          }));
        }
      }
    );
  }, [ticker]);

  return { data: tickers.data, loading: tickers.loading, error: tickers.error };
};
