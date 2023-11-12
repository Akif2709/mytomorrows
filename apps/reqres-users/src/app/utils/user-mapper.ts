import { EnrichedUser, User } from "../models/users.model";

export function mapUserFromResponse(user:User):EnrichedUser{
  return {
    ...user,
    isFavorite:false
  }
}
