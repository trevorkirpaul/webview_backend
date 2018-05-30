const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const config = require('../config')
global.fetch = require('node-fetch-polyfill')
const { UserPoolId, ClientId } = config

// setup
// const poolData = {
//   UserPoolId,
//   ClientId
// }
// const userPool = new CognitoUserPool(poolData)
// const Username = 'from1My@function.com'
// const authData = {
//   Username,
//   Password: 'PASSword1987!'
// }

// const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
// const userData = {
//   Username,
//   Pool: userPool
// }
// const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

// method to auth user
// cognitoUser.authenticateUser(authDetails, {
//   onSuccess: function(result) {
//     return console.log('TOKEN', result.getAccessToken().getJwtToken())
//   },
//   onFailure: function(err) {
//     return console.log('ERROR', err)
//   }
// })

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

authCognitoUser('fromMy@function.com', 'PASSword1987!')
  .then(token => console.log('COMPLETE PROMISE', token))
  .catch(err => console.log('FAIL PROMISE', err))