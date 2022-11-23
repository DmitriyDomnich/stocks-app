import React, { useMemo } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { Datum } from 'react-charts';
import { Tickers } from 'models/tickers/Tickers';

type Props = {
  anchor: any;
  interactiveGroup?: Datum<ChartTickerModel>[] | undefined;
};

const colorsMap: Record<Tickers, string> = {
  AAPL: '#0f83ab',
  FB: '#fd6868',
  MSFT: '#a2d925',
  GOOGL: '#decf3f',
  AMZN: '#53cfc9',
  TSLA: '#faa43a',
};

const ChartTooltip = ({ interactiveGroup, anchor }: Props) => {
  const tickersData = useMemo(() => {
    if (!interactiveGroup) {
      return null;
    }
    return interactiveGroup.map(({ originalDatum }) => (
      <li className='flex  items-center space-x-2' key={originalDatum.ticker}>
        <div
          style={{
            backgroundColor: colorsMap[originalDatum.ticker],
          }}
          className='rounded-full h-5 w-5 border-slate-200 border'
        ></div>
        <span>
          {originalDatum.ticker} - {originalDatum.price}
        </span>
      </li>
    ));
  }, [interactiveGroup]);

  return (
    <ul
      {...anchor}
      className='list-none space-y-2 w-max bg-blue-800 text-sm text-gray-200 rounded-lg p-2 border border-cyan-400'
    >
      {tickersData}
    </ul>
  );
};

export default ChartTooltip;
