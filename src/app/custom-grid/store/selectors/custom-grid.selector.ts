import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomGridState, customGridAdapter } from '../entities/custom-grid.entity';
import { GridDataResult } from '@progress/kendo-angular-grid';

const getCustomGridFeatureState = createFeatureSelector<CustomGridState>(
  'customGrids'
);

export const getCustomGrids = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => <GridDataResult>state.gridResult
);

export const getCustomGridTotal = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => state.total
);

export const getCustomGridIndex = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => state.index
);

export const getCustomGridId = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => state.id
);

export const getCustomGridsLoading = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => state.loading
);

export const getCustomGridsLoaded = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => state.loaded
);

export const getError = createSelector(
  getCustomGridFeatureState,
  (state: CustomGridState) => state.error
);
