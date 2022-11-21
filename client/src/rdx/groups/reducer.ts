import * as Actions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { WatchingGroupModel } from '../../models/groups/WatchingGroupModel';

export interface GroupsState {
  list: WatchingGroupModel[];
}
export type GroupsActions = ActionType<typeof Actions>;

const initialState: GroupsState = {
  list: [],
};

export const groupsReducer = (
  state: GroupsState = initialState,
  action: GroupsActions
): GroupsState => {
  switch (action.type) {
    case getType(Actions.setGroups):
      return {
        list: action.payload,
      };
    case getType(Actions.toggleGroupTicker):
      const { group, ticker } = action.payload;
      return {
        list: state.list.map((currGroup) =>
          group.id === currGroup.id
            ? {
                ...currGroup,
                tickers: currGroup.tickers.find(
                  (currTicker) => currTicker === ticker
                )
                  ? currGroup.tickers.filter(
                      // delete ticker from a group if there is one already
                      (currTicker) => currTicker !== ticker
                    ) // else add ticker to a group
                  : currGroup.tickers.concat(ticker),
              }
            : currGroup
        ),
      };
    case getType(Actions.removeGroup):
      return {
        list: state.list.filter((group) => group.id !== action.payload),
      };
    default:
      return state;
  }
};
