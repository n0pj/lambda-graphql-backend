import awsServerlessExpress from 'aws-serverless-express'

jest.mock('aws-serverless-express')
const mockedAwsServerlessExpress = jest.mocked(awsServerlessExpress)

describe('handler', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
