import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  API_BASE,
  User,
  RawUser,
  SingleUserResponse,
  UsersResponse,
} from '@mytomorrows/shared-models';
import { mapUserFromResponse } from '@mytomorrows/shared-utils';
import { UsersService } from './users-http.service';

const mockUsersResponse: UsersResponse = {
  total_pages: 2,
  total: 10,
  data: [
    { id: 1, first_name: 'User 1' } as User,
    { id: 2, first_name: 'User 2' } as User,
  ],
} as UsersResponse;

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getUsers().subscribe((users: User[]) => {
      expect(users).toEqual(mockUsersResponse.data.map(mapUserFromResponse));
    });

    const req = httpTestingController.expectOne(
      `${API_BASE}/users?per_page=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should get random user', () => {
    service['numberOfUsers'] = 1;

    const mockRandomUserResponse: SingleUserResponse = {
      data: { id: 1, first_name: 'Random User' } as User,
    };

    service.getRandomUser().subscribe((user: User) => {
      expect(user).toEqual(mapUserFromResponse(mockRandomUserResponse.data));
    });

    const randomUserReq = httpTestingController.match(`${API_BASE}/users/1`);
    expect(randomUserReq[0].request.method).toBe('GET');
    randomUserReq[0].flush(mockRandomUserResponse);
  });

  it('should delete user', () => {
    const mockUser: User = { id: 1, first_name: 'User to delete ' } as User;

    service.deleteUser(mockUser).subscribe();

    const req = httpTestingController.expectOne(
      `${API_BASE}/users/${mockUser.id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should create user', () => {
    const mockRawUser: RawUser = { first_name: 'New User' } as User;
    const mockCreateUserResponse: SingleUserResponse = {
      data: { id: 1, first_name: 'New User' } as User,
    };

    service.createUser(mockRawUser).subscribe((user: SingleUserResponse) => {
      expect(user).toEqual(mapUserFromResponse(mockCreateUserResponse.data));
    });

    const req = httpTestingController.expectOne(`${API_BASE}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCreateUserResponse);
  });
});
