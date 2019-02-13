import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomGrid } from './models/custom-grid.model';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromCustomGridState from './store/custom-grid.state';
import * as fromCustomGridSelector from './store/selectors/custom-grid.selector';
import * as customGridActions from './store/actions/custom-grid.action';
import { GridDataResult, GridComponent, PageChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { GridState } from './models/grid-state.model';
import { SortDescriptor, CompositeFilterDescriptor, distinct, process } from '@progress/kendo-data-query';
import { CustomGridService } from './services/custom-grid.service';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.css']
})
export class CustomGridComponent implements OnInit {
  @ViewChild('grid') private grid: GridComponent;
  public gridSelection: number[] = [];

  public gridState: GridState = {
    skip: 0,
    take: 100,
    sort: [
      { field: 'Id', dir: 'asc' }
    ],
    filter: {
      logic: 'and',
      filters: []
    }
  };

  page = 0;

  customGrids$: Observable<GridDataResult>;
  loading$: Observable<boolean>;
  error$: Observable<String>;
  total$: Observable<number>;
  index$: Observable<number>;
  id$: Observable<number>;

  storeData: CustomGrid[] = [];
  holdData: GridDataResult;
  staticindex = 0;

  customerId = 0;
  constructor(private store: Store<fromCustomGridState.AppState>, private customGridService: CustomGridService) { }

  ngOnInit() {
    this.customGrids$ = this.store.pipe(select(fromCustomGridSelector.getCustomGrids));
    this.loading$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridsLoading));
    this.error$ = this.store.pipe(select(fromCustomGridSelector.getError));
    this.total$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridTotal));
    this.index$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridIndex));
    this.id$ = this.store.pipe(select(fromCustomGridSelector.getCustomGridId));
    this.getId();
    this.customGridService.getCustomValue().subscribe(data => this.storeData = data);
  }

  public getId(): void {
    this.id$.subscribe(data => {
      this.customerId = data;
      this.store.dispatch(new customGridActions.LoadCustomGrids({ gridState: this.gridState, id: this.customerId }));
    });

  }

  // public getCustomGridData(): void {
  //   this.customGrids$.subscribe(data => {

  //     // this.store.dispatch(new customGridActions.LoadCustomGrids({ gridState: this.gridState, id: this.customerId }));
  //   });

  // }

  public sortChange(sort: SortDescriptor[]): void {
    const sorts = sort.filter(e => {
      if (e.dir === undefined) {
        e.dir = 'asc';
      }
      return e;
    });
    this.gridState.sort = sorts;

    this.store.dispatch(new customGridActions.LoadCustomGrids({ gridState: this.gridState, id: this.customerId }));
  }

  public pageChange(state: PageChangeEvent): void {
    this.gridState.take = state.take;
    this.gridState.skip = state.skip;
    this.store.dispatch(new customGridActions.LoadCustomGrids({ gridState: this.gridState, id: this.customerId }));
  }

  public filterChange(state: CompositeFilterDescriptor): void {
    this.gridState.filter = state;
    const gridstate = this.gridState;
    for (let i = 0; i < 5; i++) {
      gridstate.skip = i * 100;
      this.holdData = process(this.storeData, gridstate);
      console.log(this.holdData);
      const aa: any = this.holdData.data.filter((item, j) => {
        if (item.Id.toString() === this.customerId.toString()) {
          this.staticindex = j;
          this.page = i;
          return j;
        }
      });
    }
    this.store.dispatch(new customGridActions.LoadCustomGrids({ gridState: this.gridState, id: this.customerId }));
  }



  public distinctPrimitive(fieldName: string): any {
    return distinct([{ Age: 37 }, { Age: 27 }, { Age: 40 }, { Age: 23 }], fieldName).map(item => item[fieldName]);
  }

  public onSelectedKeysChange(e) {
    console.log(e);
  }

  public onSelectedChange(state: SelectionEvent) {
    console.log(state);
    // localStorage.setItem('id', state.selectedRows[0].dataItem.Id);
    this.store.dispatch(new customGridActions.LoadCustomGridsDetails(state.selectedRows[0].dataItem.Id));
  }

  public manualselect() {







    // this.gridSelection = [];
    // this.gridSelection.push(351);
    // this.gridState.skip = 300;
    // // this.store.dispatch(new customGridActions.LoadCustomGrids({ gridState: this.gridState, id: this.customerId }));
    // // setTimeout(() => {
    // //   document.querySelector('.k-state-selected').scrollIntoView();
    // // }, 3000);
  }





}
