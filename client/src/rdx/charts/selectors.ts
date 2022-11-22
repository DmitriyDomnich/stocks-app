import { RootState } from 'rdx/store';

export const selectChartTickerData = ({ charts }: RootState) => {
  const { data, error, loading } = charts.list;
  return {
    data,
    error,
    loading,
  };
};
export const selectChartTickerField = ({ charts }: RootState) => charts.field;
export const selectChartTickerInterval = ({ charts }: RootState) =>
  charts.interval;
