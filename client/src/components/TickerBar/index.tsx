import React, { useCallback, useMemo } from 'react';
import { TickerModel } from '../../models/tickers/TickerModel';
import { tickerToTickerName } from '../../utils/tickers';
import Badge from '../Badge';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { tickerColorsMap } from 'utils/colors';
import { Tickers } from 'models/tickers/Tickers';

type Props = {
  ticker: TickerModel;
  onClick?: (ticker: Tickers) => void;
  children?: React.ReactNode;
};
const marketPrice = 200;

const TickerBar = ({ ticker, children, onClick }: Props) => {
  const tickerName = useMemo(() => tickerToTickerName(ticker.ticker), [ticker]);
  const backgroundColor = useMemo(
    () => tickerColorsMap.getColor(ticker.ticker),
    [ticker.ticker]
  );

  const changePrice = useMemo(() => {
    const changePrice = +(ticker.price - marketPrice).toFixed(2);
    return changePrice;
  }, [ticker]);
  const isPositive = useMemo(() => changePrice > 0, [changePrice]);
  const changedPrice = useMemo(() => {
    const priceToFixed = changePrice.toFixed(2);
    return (
      <span
        className={`font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isPositive ? `+${priceToFixed}` : priceToFixed} $
      </span>
    );
  }, [changePrice, isPositive]);
  const changePercent = useMemo(() => {
    const percent = Math.abs((changePrice * 100) / marketPrice).toFixed(2);
    return (
      <Badge
        id='tickerBar'
        className={`!block ${
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
  }, [changePrice, isPositive]);

  const handleClick = useCallback(() => {
    onClick && onClick(ticker.ticker);
  }, [onClick, ticker.ticker]);

  return (
    <tr
      onClick={handleClick}
      className='first:border-none last:border-none cursor-pointer bg-slate-200 hover:bg-slate-300 border-y border-slate-300'
    >
      <td className='text-start'>
        <Badge
          style={{
            backgroundColor,
          }}
        >
          {ticker.ticker}
        </Badge>
        <span className='text-gray-800 font-medium ml-2'>{tickerName}</span>
      </td>
      <td className='text-gray-800 font-medium'>{ticker.price} $</td>
      <td className='font-mono pt-1 pb-2'>
        {changedPrice}
        {changePercent}
      </td>
      <td className='hidden md:table-cell'>{ticker.dividend}</td>
      <td className='hidden md:table-cell'>{ticker.yield}</td>
      <td>{children}</td>
    </tr>
  );
};

export default TickerBar;
