export const composeName = (user, alt) => {
  return user ? `${user.firstName} ${user.lastName}` : alt;
};
