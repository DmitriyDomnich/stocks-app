import React, { useMemo } from 'react';
import Badge from 'components/Badge';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppSelector } from 'rdx/hooks';
import { selectChartTickerInterval } from 'rdx/charts/selectors';
import { TickerInterval } from 'services/tickersService';

type Props = {
  tickerData: ChartTickerModel[];
};

const intervalMap: Record<TickerInterval, string> = {
  yday: 'Yesterday',
  '1M': '1 month',
  '5D': '5 days',
  '6M': '6 month',
};

const ChartInfo = ({ tickerData }: Props) => {
  const interval = useAppSelector(selectChartTickerInterval);
  const initPrice = useMemo(() => tickerData[0].price, [tickerData]);
  const lastPrice = useMemo(
    () => tickerData[tickerData.length - 1].price,
    [tickerData]
  );
  const changePercent = useMemo(() => {
    const percent = Math.abs((lastPrice * 100) / initPrice - 100).toFixed(2);
    const isPositive = lastPrice > initPrice;
    return (
      <Badge
        className={`mt-1 ${
          isPositive
            ? 'text-green-600 bg-green-600/50'
            : 'text-red-600 bg-red-600/50'
        }`}
      >
        {isPositive ? (
          <ArrowUpwardIcon fontSize='small' />
        ) : (
          <ArrowDownwardIcon fontSize='small' />
        )}
        {percent} %
      </Badge>
    );
  }, [initPrice, lastPrice]);
  const difference = useMemo(() => {
    const resultPrice = +(lastPrice - initPrice).toFixed(2);
    const isPositive = resultPrice > 0;
    return (
      <div
        className={`text-lg ${isPositive ? 'text-green-600' : 'text-red-600'}`}
      >
        {isPositive ? `+${resultPrice}` : resultPrice} {intervalMap[interval]}
      </div>
    );
  }, [lastPrice, interval, initPrice]);

  return (
    <div className='flex space-x-2 items-center h-16'>
      <div className='font-semibold text-4xl'>{lastPrice} $</div>
      {changePercent}
      {difference}
    </div>
  );
};

export default ChartInfo;
