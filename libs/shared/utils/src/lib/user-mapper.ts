import { RawUser, User } from '@mytomorrows/shared-models';

export function mapUserFromResponse(user: RawUser): User {
  return {
    ...user,
    isFavorite: false,
  };
}
