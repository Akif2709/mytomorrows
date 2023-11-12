import { Route } from '@angular/router';
import { NotFoundComponent } from '@mytomorrows/core';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@mytomorrows/users').then((x) => x.HomeComponent),
    data: { animation: 'LeftPage' },
  },
  {
    path: 'favorite-users',
    loadComponent: () =>
      import('@mytomorrows/favorite-users').then(
        (x) => x.FavoriteUsersViewComponent
      ),
    data: { animation: 'RightPage' },
  },
  { path: '**', component: NotFoundComponent },
];
