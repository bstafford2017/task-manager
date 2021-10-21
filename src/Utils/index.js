// Synchronous solution to waiting for loading user
const hasToken = () => {
  return !!localStorage.getItem('token')
}

export default hasToken
