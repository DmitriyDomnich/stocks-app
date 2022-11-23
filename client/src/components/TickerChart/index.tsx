import React, { useMemo } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { ChartSeries } from 'rdx/charts/reducer';
import { AxisOptions, Chart } from 'react-charts';
import { useAppSelector } from 'rdx/hooks';
import { selectChartTickerField } from 'rdx/charts/selectors';
import ChartTooltip from './ChartTooltip';

type Props = {
  data: ChartSeries[];
};

const TickerChart = ({ data }: Props) => {
  const field = useAppSelector(selectChartTickerField);

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
        getValue: (datum) => datum[field],
      },
    ],
    [field]
  );

  return (
    <div className='my-5 w-full md:max-w-3xl h-96'>
      <Chart
        options={{
          primaryAxis,
          secondaryAxes,
          data,
          tooltip: {
            render: ({ anchor, focusedDatum }) => (
              <ChartTooltip
                interactiveGroup={focusedDatum?.interactiveGroup}
                anchor={{ ...anchor }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default TickerChart;
