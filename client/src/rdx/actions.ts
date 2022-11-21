import { ActionType } from 'typesafe-actions';
import * as chartsActions from './charts/actions';
import * as groupsActions from './groups/actions';
import * as tickersActions from './tickers/actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

const allActions = {
  chartsActions,
  groupsActions,
  tickersActions,
};

export type RootActions = ActionType<typeof allActions>;
export type ThunkAppType = ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  RootActions
>;
