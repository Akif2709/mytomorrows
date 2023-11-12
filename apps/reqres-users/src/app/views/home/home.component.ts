import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users-http.service';
import { UserListItemComponent } from '../../components/user-list-item/user-list-item.component';
import {
  BehaviorSubject,
  Subscription,
  catchError,
  combineLatest,
  interval,
  map,
  of,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { EnrichedUser } from '../../models/users.model';
import {  DataState, DataStatus } from '../../models/observable-status.model';
import { FavoriteUsersService } from '../../services/favorite-users.service';
import { setError, setLoading, setSuccess } from '../../utils/state-helpers';

@Component({
  selector: 'mytomorrows-home',
  standalone: true,
  imports: [CommonModule, UserListItemComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly usersState$ = new BehaviorSubject<DataState<EnrichedUser[]>>({} as DataState<EnrichedUser[]>)
  private intervalSubscription?: Subscription;
  readonly favoriteUsers$ = this.favoriteUsersService.getFavoriteUsers$()
  readonly dataStatus = DataStatus

  constructor(private readonly usersService: UsersService, private readonly favoriteUsersService: FavoriteUsersService) {}

  readonly usersWithFavoriteData$ = combineLatest([
    this.favoriteUsers$,
    this.usersState$
  ]).pipe(map(([favoriteUsers, usersState])=>{
    if(usersState.status === DataStatus.SUCCESS && usersState.value){
      return {
          ...usersState,
        value:usersState.value.map(user => ({
        ...user,
        isFavorite: favoriteUsers.some(f => f.id === user.id)
      }))
    }
    } else {
      return usersState
    }
  }))

  ngOnInit(): void {
    this.fetchUsers()
  }


  toggleNewUserInterval(event$: Event) {
    if ((event$.target as HTMLInputElement).checked) {

      this.intervalSubscription = interval(5000)
      .pipe(switchMap(() => this.usersService.getRandomUser()))
      .subscribe((user) => {
          const previousUsers = this.usersState$.value.value || [];
          const slicedUsers = [user, ...previousUsers].slice(0, 10)
          this.usersState$.next(setSuccess(slicedUsers) as DataState<EnrichedUser[]>)
      });

    } else {
      this.intervalSubscription?.unsubscribe();
    }
  }

  toggleFavorite(user:EnrichedUser){
    if(user.isFavorite){
      this.favoriteUsersService.removeFavoriteUser(user);
    }else {
      this.favoriteUsersService.addFavoriteUser(user);
    }
  }

  deleteUser(user:EnrichedUser){

    this.usersService.deleteUser(user).pipe(take(1)).subscribe({
      next:() => {
        const {value, ...rest} = this.usersState$.value || [];
        const nextState = {...rest, value: value?.filter(u => u.id !== user.id)}
        this.usersState$.next(nextState)
      },
      error:()=>{

      }
  })
  }


private fetchUsers(){
  this.usersService.getUsers().pipe(
    take(1),
    map((users) => setSuccess(users)),
    startWith(setLoading()),
    catchError((err)=>of(setError(err)))
    )
    .subscribe((response) => this.usersState$.next(response as DataState<EnrichedUser[]>))
}

}
