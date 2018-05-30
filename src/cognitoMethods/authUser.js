const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const config = require('../config')
global.fetch = require('node-fetch-polyfill')
const { UserPoolId, ClientId } = config

// ? CREATE PROMISE BASED HELPER FXN
const authCognitoUser = (Username, Password) => {
  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username,
    Password
  })
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username,
    Pool: new CognitoUserPool({ UserPoolId, ClientId })
  })
  return promise = new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        return resolve(result.getAccessToken().getJwtToken())
      },
      onFailure: (err) => {
        return reject(err)
      }
    })
  })
}

// ? EXAMPLE USE OF AUTH USER FUNCTION
// authCognitoUser('from1My@function.com', 'PASSword1987!')
//   .then(token => console.log('COMPLETE PROMISE', token))
//   .catch(err => console.log('FAIL PROMISE', err))

module.exports = {
  authCognitoUser
}