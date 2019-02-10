import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomGrid } from './models/custom-grid.model';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromCustomGridState from './store/custom-grid.state';
import * as fromCustomGridSelector from './store/selectors/custom-grid.selector';
import * as customGridActions from './store/actions/custom-grid.action';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { GridState } from './models/grid-state.model';
import { SortDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.css']
})
export class CustomGridComponent implements OnInit {
  @ViewChild('grid') private grid: GridComponent;

  public gridState: GridState = {
    skip: 0,
    take: 100,
    sort: [
      { field: 'Id', dir: 'asc' }
    ],
    filter: null
  };

  customGrids$: Observable<GridDataResult>;
  loading$: Observable<boolean>;
  error$: Observable<String>;
  total$: Observable<number>;
  index$: Observable<number>;
  id$: Observable<number>;
  constructor(private store: Store<fromCustomGridState.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customGridActions.LoadCustomGrids(this.gridState));
    this.customGrids$ = this.store.pipe(select(fromCustomGridSelector.getCustomGrids));
    this.loading$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridsLoading));
    this.error$ = this.store.pipe(select(fromCustomGridSelector.getError));
    this.total$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridTotal));
    this.index$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridIndex));
    this.id$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridId));
  }

  public sortChange(sort: SortDescriptor[]): void {
    const sorts = sort.filter(e => {
      if (e.dir === undefined) {
        e.dir = 'asc';
      }
      return e;
    });
    this.gridState.sort = sorts;
    this.store.dispatch(new customGridActions.LoadCustomGrids(this.gridState));
  }

  public pageChange(state: PageChangeEvent): void {
    this.gridState.take = state.take;
    this.gridState.skip = state.skip;
    this.store.dispatch(new customGridActions.LoadCustomGrids(this.gridState));
  }

  public filterChange(state: CompositeFilterDescriptor): void {
    this.gridState.filter = state;
    console.log(state);
    this.store.dispatch(new customGridActions.LoadCustomGrids(this.gridState));
  }

}
