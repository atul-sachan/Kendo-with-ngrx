import { SortDescriptor } from '@progress/kendo-data-query';

export interface GridState {
  skip: number;
  take: number;
  sort: SortDescriptor[];
}
