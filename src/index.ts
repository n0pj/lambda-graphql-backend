import awsServerlessExpress from 'aws-serverless-express'
import app from './app'

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app)

const handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
}

export default handler
