import { Injectable } from '@angular/core';
import { User } from '@mytomorrows/shared-models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteUsersService {
  private readonly _favoriteUsers$ = new BehaviorSubject<User[]>([]);

  getFavoriteUsers(): Observable<User[]> {
    return this._favoriteUsers$.asObservable();
  }

  addFavoriteUser(user: User) {
    const previousUsers = this._favoriteUsers$.value;
    this._favoriteUsers$.next([user, ...previousUsers]);
  }

  removeFavoriteUser(user: User) {
    const previousUsers = this._favoriteUsers$.value;
    this._favoriteUsers$.next(previousUsers.filter((u) => u.id !== user.id));
  }
}
