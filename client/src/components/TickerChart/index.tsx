import React, { useMemo } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { ChartSeries } from 'rdx/charts/reducer';
import { AxisOptions, Chart } from 'react-charts';
import { useAppSelector } from 'rdx/hooks';
import { selectChartTickerField } from 'rdx/charts/selectors';
import { tickerColorsMap } from 'utils/colors';
import { Tickers } from 'models/tickers/Tickers';

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
      // position: 'top',
      // showGrid: true,
      // showDatumElements: false,
      // stacked: true,

      // styles: {
      //   line: {
      //     color: 'yellow',
      //   },
      // },
      // tickLabelRotationDeg: 90,
      // tickCount: 20,
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
          // defaultColors: ['#f00', '#0f0', 'yellow'],
          // brush: {
          //   onSelect: (val) => console.log(val),
          // },
          // getDatumStyle: (datum, status) => {
          // console.log(datum., status);
          // console.log(datum);

          //   return {
          //     color: 'blue',
          //   };
          // },
          getSeriesStyle: (series) => ({
            color: tickerColorsMap.getColor(series.label as Tickers),
          }),
          // interactionMode: 'primary',
          // intersectionObserverRootMargin: '220px',
          // memoizeSeries: true,
          // padding: {
          //   left: 100,
          //   right: 0,
          // },
          // primaryCursor: {
          //   showLabel: true,
          //   showLine:
          // },
          // renderSVG: () => '2332',
          // showDebugAxes: true,
          // useIntersectionObserver: true,
          primaryAxis,
          secondaryAxes,
          data,
        }}
      />
    </div>
  );
};

export default TickerChart;
