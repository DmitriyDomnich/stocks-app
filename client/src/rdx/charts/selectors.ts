import { RootState } from 'rdx/store';

export const selectChartTickerData = ({ charts }: RootState) => {
  const { data, error, loading } = charts.list;
  return {
    data,
    error,
    loading,
  };
};
