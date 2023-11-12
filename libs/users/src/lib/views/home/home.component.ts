import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataState, DataStatus, User } from '@mytomorrows/shared-models';
import { setError, setLoading, setSuccess } from '@mytomorrows/shared-utils';
import {
  LoadingComponent,
  UserListItemComponent,
} from '@mytomorrows/shared-ui';
import { CreateUserFormComponent } from '../../components/create-user-form/create-user-form.component';
import { AddUserForm } from '../../models/add-user-form.model';
import {
  FavoriteUsersService,
  NotificationService,
  UsersService,
} from '@mytomorrows/shared-services';
import { mapPostUser } from '../../utils/user-mapper.utils';

@Component({
  selector: 'mytomorrows-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserListItemComponent,
    CreateUserFormComponent,
    LoadingComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly usersState$ = new BehaviorSubject<DataState<User[]>>(
    {} as DataState<User[]>
  );
  private intervalSubscription?: Subscription;
  readonly favoriteUsers$ = this.favoriteUsersService.getFavoriteUsers();
  readonly dataStatus = DataStatus;
  formGroup: FormGroup<AddUserForm> = this.createForm();

  readonly isFavoriteUsersReachToLimit$ = this.favoriteUsers$.pipe(
    map((users) => users.length >= 10)
  );

  constructor(
    private readonly usersService: UsersService,
    private readonly favoriteUsersService: FavoriteUsersService,
    private readonly notificationService: NotificationService
  ) {}

  readonly usersWithFavoriteData$ = combineLatest([
    this.favoriteUsers$,
    this.usersState$,
  ]).pipe(
    map(([favoriteUsers, usersState]) => {
      if (usersState.status === DataStatus.SUCCESS && usersState.value) {
        const users = usersState.value.map((user) => ({
          ...user,
          isFavorite: favoriteUsers.some((f) => f.id === user.id),
        }));
        return setSuccess(users) as DataState<User[]>;
      } else {
        return usersState;
      }
    })
  );

  ngOnInit(): void {
    this.fetchUsers();
  }

  toggleNewUserInterval(event$: Event) {
    if ((event$.target as HTMLInputElement).checked) {
      this.intervalSubscription = interval(5000)
        .pipe(switchMap(() => this.usersService.getRandomUser()))
        .subscribe((user) => {
          const previousUsers = this.usersState$.value.value || [];
          const slicedUsers = [user, ...previousUsers].slice(0, 10);
          this.usersState$.next(setSuccess(slicedUsers) as DataState<User[]>);
        });
    } else {
      this.intervalSubscription?.unsubscribe();
    }
  }

  toggleFavorite(user: User) {
    if (user.isFavorite) {
      this.favoriteUsersService.removeFavoriteUser(user);
    } else {
      this.favoriteUsersService.addFavoriteUser(user);
    }
  }

  deleteUser(user: User) {
    this.usersService
      .deleteUser(user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const { value, ...rest } = this.usersState$.value || [];
          const nextState = {
            ...rest,
            value: value?.filter((u) => u.id !== user.id),
          };
          this.usersState$.next(nextState);
          this.notificationService.showNotification(
            'success',
            `You successfully deleted the user: ${user.first_name} ${user.last_name}`
          );
        },
        error: () => {
          this.notificationService.showNotification(
            'error',
            `Something went wrong!`
          );
        },
      });
  }

  handleOnSubmit() {
    const mappedUser = mapPostUser(this.formGroup);
    this.usersService
      .createUser(mappedUser)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const previousUsers = this.usersState$.value.value || [];
          const nextState = setSuccess([
            { isFavorite: false, ...mappedUser },
            ...previousUsers,
          ]);
          this.usersState$.next(nextState as DataState<User[]>);
          this.formGroup.reset();
          this.notificationService.showNotification(
            'success',
            `You successfully deleted the user: ${mappedUser.first_name} ${mappedUser.last_name}`
          );
        },
        error: () => {
          this.notificationService.showNotification(
            'error',
            `Something went wrong!`
          );
        },
      });
  }

  private fetchUsers() {
    this.usersService
      .getUsers()
      .pipe(
        take(1),
        map((users) => setSuccess(users)),
        startWith(setLoading()),
        catchError((err) => of(setError(err)))
      )
      .subscribe((response) =>
        this.usersState$.next(response as DataState<User[]>)
      );
  }

  private createForm() {
    return new FormGroup<AddUserForm>({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      imgUrl: new FormControl(null),
    });
  }
}
