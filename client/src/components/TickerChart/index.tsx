import React, { useMemo } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { ChartSeries } from 'rdx/charts/reducer';
import { AxisOptions, Chart } from 'react-charts';

type Props = {
  data: ChartSeries[];
};

const TickerChart = ({ data }: Props) => {
  console.log(data, 'data');

  const primaryAxis = useMemo<AxisOptions<ChartTickerModel>>(
    () => ({
      getValue: (datum) => {
        const date = new Date(datum.date);
        const utc = date.getTime() + Math.abs(date.getTimezoneOffset()) * 60000;
        return new Date(utc);
      },
      scaleType: 'localTime',
    }),
    []
  );
  const secondaryAxes = useMemo<AxisOptions<ChartTickerModel>[]>(
    () => [
      {
        getValue: (datum) => datum.price,
      },
    ],
    []
  );

  return (
    <div className='my-5 w-full md:max-w-3xl h-96'>
      <Chart
        options={{
          primaryAxis,
          secondaryAxes,
          data,
        }}
      />
    </div>
  );
};

export default TickerChart;
