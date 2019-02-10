import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CustomGridComponent } from './custom-grid/custom-grid.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'grid', loadChildren: './custom-grid/custom-grid.module#CustomGridModule' },
  { path: '**', redirectTo: '/grid', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
