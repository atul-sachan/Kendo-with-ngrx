import { CustomGrid } from '../../models/custom-grid.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GridDataResult } from '@progress/kendo-angular-grid';

// export interface CustomGridState extends EntityState<CustomGrid> {
//   CustomGrids: CustomGrid[];
//   CustomGridId: number | null;
//   loading: boolean;
//   loaded: boolean;
//   error: string;
// }

export interface CustomGridState {
  gridResult: GridDataResult;
  total: number | null;
  index: number | null;
  id: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const customGridAdapter: EntityAdapter<CustomGrid> = createEntityAdapter<CustomGrid>();

export const defaultCustomGrid: CustomGridState = {
  gridResult: <GridDataResult>{ data: [], total: 0 },
  total: 0,
  index: 0,
  id: 0,
  loading: true,
  loaded: false,
  error: ''
};

// export const initialState = customGridAdapter.getInitialState(defaultCustomGrid);
export const initialState = defaultCustomGrid;
