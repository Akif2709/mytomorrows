import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from '../constants/common';
import { Observable, map, tap } from 'rxjs';
import { EnrichedUser, SingleUserResponse, User, UsersResponse } from '../models/users.model';
import { mapUserFromResponse } from '../utils/user-mapper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private numberOfUsers: number = 0;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get 10 users
   */
  getUsers(): Observable<EnrichedUser[]> {
    return this.httpClient
        .get<UsersResponse>(`${API_BASE}/users`, {
          params: { per_page: 10 },
        })
        .pipe(
          tap((response: UsersResponse) => this.numberOfUsers = response.total),
          map((response) => response.data),
          map(users => users.map(mapUserFromResponse))
        )
  }

  /**
   * Get single response with random id
   */
  getRandomUser(): Observable<EnrichedUser> {
    const randomUserId = Math.floor(Math.random() * this.numberOfUsers) + 1;
    return this.httpClient
        .get<SingleUserResponse>(`${API_BASE}/users/${randomUserId}`)
        .pipe(map((res) => res.data), map(user => mapUserFromResponse(user)))
  }

  /**
   * Delete single user with id
   */
  deleteUser(user:User) {
    return this.httpClient
        .delete<SingleUserResponse>(`${API_BASE}/users/${user.id}`)
        .pipe(map((res) => res), tap(console.log))
  }
}
