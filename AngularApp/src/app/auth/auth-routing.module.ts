import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from '../pages/logout/logout.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: AuthComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
