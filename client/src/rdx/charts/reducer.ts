import { ChartTickerModel } from 'models/tickers/TickerModel';
import { Tickers } from 'models/tickers/Tickers';
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
}
export type ChartsActions = ActionType<typeof Actions>;

const initialState: ChartsState = {
  list: {
    data: null,
    error: null,
    loading: false,
  },
};

export const chartsReducer = (
  state: ChartsState = initialState,
  action: ChartsActions
): ChartsState => {
  switch (action.type) {
    case getType(Actions.getTickerDataByIntervalAsync.request):
      return {
        list: {
          ...state.list,
          loading: true,
          error: null,
        },
      };
    case getType(Actions.getTickerDataByIntervalAsync.success):
      const label = action.payload[0].ticker;
      const prevData = state.list.data || [];
      return {
        list: {
          loading: false,
          data: prevData.concat({ label, data: action.payload }),
          error: null,
        },
      };
    case getType(Actions.getTickerDataByIntervalAsync.failure):
      return {
        list: {
          ...state.list,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
