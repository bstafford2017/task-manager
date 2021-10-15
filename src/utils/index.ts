export const response = (statusCode: number, body: any = {}) => ({
  statusCode,
  body: JSON.stringify(body)
})
