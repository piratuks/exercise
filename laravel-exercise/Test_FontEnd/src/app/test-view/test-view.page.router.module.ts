import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestViewPage } from './test-view.page';

const routes: Routes = [
  { path: '', component: TestViewPage }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);