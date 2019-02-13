import { Action } from '@ngrx/store';
import { CustomGrid } from '../../models/custom-grid.model';
import { CustomGridViewModel } from '../../models/custom-grid.viewmodel';
import { GridState } from '../../models/grid-state.model';

export enum CustomGridActionTypes {
  LOAD_CUSTOM_GRIDS = '[Custom Grid] Load Custom Grid',
  LOAD_CUSTOM_GRIDS_SUCCESS = '[Custom Grid] Load Custom Grid Success',
  LOAD_CUSTOM_GRIDS_FAIL = '[Custom Grid] Load Custom Grid Fail',
  LOAD_CUSTOM_GRIDS_DETAILS = '[Custom Grid] Load Custom Grid Details'
}

export class LoadCustomGrids implements Action {
  readonly type = CustomGridActionTypes.LOAD_CUSTOM_GRIDS;
  constructor(public payload: { gridState: GridState, id: number }) { }
}

export class LoadCustomGridsSuccess implements Action {
  readonly type = CustomGridActionTypes.LOAD_CUSTOM_GRIDS_SUCCESS;

  constructor(public payload: CustomGridViewModel) { }
}

export class LoadCustomGridsFail implements Action {
  readonly type = CustomGridActionTypes.LOAD_CUSTOM_GRIDS_FAIL;

  constructor(public payload: string) { }
}

export class LoadCustomGridsDetails implements Action {
  readonly type = CustomGridActionTypes.LOAD_CUSTOM_GRIDS_DETAILS;

  constructor(public payload: number) { }
}

export type Action =
  | LoadCustomGrids
  | LoadCustomGridsSuccess
  | LoadCustomGridsFail
  | LoadCustomGridsDetails;
