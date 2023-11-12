import { mapUserFromResponse } from './user-mapper'; // Update the import path accordingly
import { RawUser, User } from '@mytomorrows/shared-models';

describe('mapUserFromResponse', () => {
  it('should map user from response', () => {
    const rawUser: RawUser = {
      id: 1,
      first_name: 'John Doe',
    } as RawUser;

    const mappedUser: User = mapUserFromResponse(rawUser);

    // Ensure the properties are correctly mapped
    expect(mappedUser.id).toEqual(rawUser.id);
    expect(mappedUser.first_name).toEqual(rawUser.first_name);

    expect(mappedUser.isFavorite).toBe(false);
  });
});
