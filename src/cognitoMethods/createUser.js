const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const config = require('../config')
global.fetch = require('node-fetch-polyfill')
const { UserPoolId, ClientId } = config

// init setup
const poolData = {
  UserPoolId, // found in 'General Settings' from cognito dashboard tab settings
  ClientId  //found in 'App clients' from cognito dashboard tab settings
}
const userPool = new CognitoUserPool(poolData)

const createCognitoUser = ({ username, password, email, phone }) => {
  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email })
  const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'phone_number', Value: phone })
  const attributeList = [
    attributeEmail,
    attributePhoneNumber,
  ]
  let cognitoUser;
  return promise = new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) { return reject(err) }
      cognitoUser = result.user
      resolve(cognitoUser.getUsername())
    })
  })
}

// ? EXAMPLE USE OF CREATE / REGISTER FXN
// createCognitoUser({ username: 'newLocation@function.com', password: 'PASSword1987!', email: 'newLocation@function.com', phone: ''})
//   .then(data => console.log(data))
//   .catch(e => console.log(e))

module.exports = {
  createCognitoUser
}