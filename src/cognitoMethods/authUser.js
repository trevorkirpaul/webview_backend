const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const config = require('../config')
global.fetch = require('node-fetch-polyfill')
const { UserPoolId, ClientId } = config

// setup
const poolData = {
  UserPoolId,
  ClientId
}
const userPool = new CognitoUserPool(poolData)
const Username = 'from1My@function.com'
const authData = {
  Username,
  Password: 'PASSword1987!'
}

const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
const userData = {
  Username,
  Pool: userPool
}
const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

// method to auth user
cognitoUser.authenticateUser(authDetails, {
  onSuccess: function(result) {
    return console.log('TOKEN', result.getAccessToken().getJwtToken())
  },
  onFailure: function(err) {
    return console.log('ERROR', err)
  }
})