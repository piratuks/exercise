import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'test', loadChildren: './test-view/test-view.page.module#TestViewPageModule' },
  { path: '**', loadChildren: './test-view/test-view.page.module#TestViewPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
