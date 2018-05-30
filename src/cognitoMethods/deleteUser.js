const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const aws = require('aws-sdk');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const config = require('../config')
global.fetch = require('node-fetch-polyfill')
const { UserPoolId, ClientId, accessKeyId, secretAccessKey } = config
const CLIENT = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: 'us-east-2',
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})

// ? CREATE PROMISE BASED HELPER FXN
const deleteCognitoUser = (Username) => {
  const Pool = new CognitoUserPool({
    UserPoolId,
    ClientId
  })
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username,
    Pool
  })
  return promise = new Promise((resolve, reject) => {
    CLIENT.adminDeleteUser({
      UserPoolId,
      Username
    }, (err,data) => {
      if (err) { return reject(err) }
      return resolve(data)
    })
  })
}

// deleteCognitoUser('from1My@function.com')
//   .then(res => console.log('DELETE_SUCCESS', res))
//   .catch(err => console.log('DELETE_FAIL', err))

module.exports = {
  deleteCognitoUser
}