import crypto from 'crypto'

const generateSecretHash = (clientId, clientSecret, data) => {
  const message = data + clientId
  const hmac = crypto.createHmac('SHA256', clientSecret)
  hmac.update(message)
  return hmac.digest('base64')
}

export default generateSecretHash
