export const composeName = (user, alt) => {
  return user ? `${user.firstName} ${user.lastName}` : alt;
};

export const isRomanNumeral = () => {
  return JSON.parse(localStorage.getItem('romanNumeral'))
}



