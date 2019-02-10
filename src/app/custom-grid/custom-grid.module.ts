import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomGridRoutingModule } from './custom-grid-routing.module';
import { CustomGridComponent } from './custom-grid.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomGridEffect } from './store/effects/custom-grid.effect';
import { customGridReducer } from './store/reducers/custom-grid.reducer';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    InputsModule,
    CustomGridRoutingModule,
    StoreModule.forFeature('customGrids', customGridReducer),
    EffectsModule.forFeature([CustomGridEffect])
  ]
})
export class CustomGridModule { }
