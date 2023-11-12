import { Route } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FavoriteUsersViewComponent } from './views/favorite-users-view/favorite-users-view.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,  data: { animation: 'LeftPage' }, },
  { path:'favorite-users', component:FavoriteUsersViewComponent,  data: { animation: 'RightPage' },}
];
