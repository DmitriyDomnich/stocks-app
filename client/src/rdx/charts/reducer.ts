import { ChartTickerModel } from 'models/tickers/TickerModel';
import { Tickers } from 'models/tickers/Tickers';
import { TickerInterval } from 'services/tickersService';
import { ActionType, getType } from 'typesafe-actions';
import * as Actions from './actions';

export type ChartSeries = {
  label: Tickers;
  data: ChartTickerModel[];
};
export interface ChartsState {
  list: {
    data: ChartSeries[] | null;
    loading: boolean;
    error: null | string;
  };
  field: keyof ChartTickerModel;
  interval: TickerInterval;
}
export type ChartsActions = ActionType<typeof Actions>;

const initialState: ChartsState = {
  list: {
    data: null,
    error: null,
    loading: false,
  },
  field: 'price',
  interval: 'yday',
};

export const chartsReducer = (
  state: ChartsState = initialState,
  action: ChartsActions
): ChartsState => {
  switch (action.type) {
    case getType(Actions.getTickerDataByIntervalAsync.request):
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: null,
        },
      };
    case getType(Actions.getTickerDataByIntervalAsync.success):
      return {
        ...state,
        list: {
          loading: false,
          data: action.payload.map((chartTicker) => ({
            label: chartTicker[0].ticker,
            data: chartTicker,
          })),
          error: null,
        },
      };
    case getType(Actions.getTickerDataByIntervalAsync.failure):
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload,
        },
      };
    case getType(Actions.setField):
      return {
        ...state,
        field: action.payload,
      };
    case getType(Actions.setInterval):
      return {
        ...state,
        interval: action.payload,
      };
    case getType(Actions.removeChartData):
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data!.filter(
            (series) => series.label !== action.payload
          ),
        },
      };
    case getType(Actions.clearCharts):
      return {
        field: 'price',
        interval: 'yday',
        list: {
          data: null,
          error: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};
