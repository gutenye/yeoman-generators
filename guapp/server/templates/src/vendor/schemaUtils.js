// @flow

export function requireAuth(user: any) {
  if (!user) {
    throw new Error('Unauthorized')
  }
}
