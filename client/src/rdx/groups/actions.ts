import { Tickers } from 'models/tickers/Tickers';
import { createAction } from 'typesafe-actions';
import { WatchingGroupModel } from '../../models/groups/WatchingGroupModel';

export const setGroups = createAction('SET_GROUPS')<WatchingGroupModel[]>();
export const toggleGroupTicker = createAction('TOGGLE_GROUP')<{
  group: WatchingGroupModel;
  ticker: Tickers;
}>();
export const removeGroup = createAction('REMOVE_GROUP')<string>();
