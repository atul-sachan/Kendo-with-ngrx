import { GridDataResult } from '@progress/kendo-angular-grid';

export interface CustomGridViewModel {
  gridResult: GridDataResult;
  total: number;
  index: number;
  id: number;
}
