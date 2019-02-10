import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CustomGridService } from '../../services/custom-grid.service';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as customGridActions from '../actions/custom-grid.action';
import { CustomGrid } from '../../models/custom-grid.model';
import { of } from 'rxjs';
import { CustomGridViewModel } from '../../models/custom-grid.viewmodel';

@Injectable()
export class CustomGridEffect {
  constructor(
    private actions$: Actions,
    private customGridService: CustomGridService
  ) {}

  // @Effect()
  // loadCustomers$: Observable<Action> = this.actions$.pipe(
  //   ofType<customGridActions.LoadCustomGrids>(customGridActions.CustomGridActionTypes.LOAD_CUSTOM_GRIDS),
  //   switchMap((action: customGridActions.LoadCustomGrids) =>
  //     this.customGridService.getCustomGrids().pipe(
  //       map(
  //         (customGrids: CustomGrid[]) =>
  //           new customGridActions.LoadCustomGridsSuccess(customGrids)
  //       ),
  //       catchError(err => of(new customGridActions.LoadCustomGridsFail(err)))
  //     )
  //   )
  // );

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customGridActions.LoadCustomGrids>(customGridActions.CustomGridActionTypes.LOAD_CUSTOM_GRIDS),
    switchMap((action: customGridActions.LoadCustomGrids) =>
      this.customGridService.getCustomGrids().pipe(
        map(
          (customGridViewModel: CustomGridViewModel) => {
            return new customGridActions.LoadCustomGridsSuccess(customGridViewModel);
          }
        ),
        catchError(err => of(new customGridActions.LoadCustomGridsFail(err)))
      )
    )
  );

}
