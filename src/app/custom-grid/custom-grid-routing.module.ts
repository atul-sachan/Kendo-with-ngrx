import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomGridComponent } from './custom-grid.component';

const routes: Routes = [
  {path: '' , component: CustomGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomGridRoutingModule { }
