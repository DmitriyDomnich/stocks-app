import { TickerModel } from 'models/tickers/TickerModel';
import { ActionType, getType } from 'typesafe-actions';
import * as Actions from './actions';

export interface TickersState {
  list: TickerModel[];
}
export type TickersActions = ActionType<typeof Actions>;

const initialState: TickersState = {
  list: [],
};

export const tickersReducer = (
  state: TickersState = initialState,
  action: TickersActions
): TickersState => {
  switch (action.type) {
    case getType(Actions.setTickers):
      return {
        list: action.payload,
      };
    default:
      return state;
  }
};
