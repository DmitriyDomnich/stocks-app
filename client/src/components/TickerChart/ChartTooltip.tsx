import React, { useMemo } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { Datum } from 'react-charts';
import { tickerColorsMap } from 'utils/colors';

type Props = {
  anchor: any;
  interactiveGroup?: Datum<ChartTickerModel>[] | undefined;
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
            backgroundColor: tickerColorsMap.getColor(originalDatum.ticker),
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
