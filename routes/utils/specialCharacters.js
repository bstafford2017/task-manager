export const removeSpecialCharacters = (string) => {
  if (typeof string === 'string') {
    return string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  }
}
