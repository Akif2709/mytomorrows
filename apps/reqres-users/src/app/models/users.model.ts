export interface RawUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface SingleUserResponse {
  data: User;
}

export interface User extends RawUser {
  isFavorite: boolean;
}
