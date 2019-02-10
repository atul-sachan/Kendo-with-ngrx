import { customGridAdapter, CustomGridState, initialState } from '../entities/custom-grid.entity';
import * as customGridActions from '../actions/custom-grid.action';

export function customGridReducer(state: CustomGridState = initialState, action: customGridActions.Action): CustomGridState {
  switch (action.type) {
    case customGridActions.CustomGridActionTypes.LOAD_CUSTOM_GRIDS_SUCCESS: {
      return {
        ...state,
        gridResult: action.payload.gridResult,
        total: action.payload.total,
        index: action.payload.index,
        id: action.payload.id,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case customGridActions.CustomGridActionTypes.LOAD_CUSTOM_GRIDS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
