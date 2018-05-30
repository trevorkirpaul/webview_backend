const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const config = require('./config')

const { UserPoolId, ClientId } = config

// set fetch to polyfill for cognito methods
global.fetch = require('node-fetch-polyfill')

/*
  connect app to our cognito userpool
  you'll need to create an 'app client' from the AWS cognito dashboard
  ! ensure that 'Generate client secret' is unchecked when creating 'app client'
*/
const poolData = {
  UserPoolId, // found in 'General Settings' from cognito dashboard tab settings
  ClientId  //found in 'App clients' from cognito dashboard tab settings
}

const userPool = new CognitoUserPool(poolData)

// username is out AWS account
const userData = {
  Username: 'trevor.kirpaul',
  Pool: userPool
}

/*
  ? **-- REGISTER/CREATE USER FEATURE --**
  Here we create the attributes for the new user
  This is all based on our
  'Attributes' settings from the
  AWS cognito dashboard

  For example, we have our users set to only allow
  emails as usernames
*/

// const dataEmail = {
//   Name: 'email',
//   Value: 'test3@test.com'
// }

// const dataPhoneNumber = {
//   Name: 'phone_number',
//   Value: ''
// }

// const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
// const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber)

// const attributeList = [
//   attributeEmail,
//   attributePhoneNumber,
// ]

// let cognitoUser;

// Register/Create new user
// @params = (username, password, attributes, ???, callback)
// userPool.signUp('test3@test.com', 'PASSword1987!', attributeList, null, (err, result) => {
//   if (err) { return console.log('ERROR', err) }
//   cognitoUser = result.user
//   console.log(`user name is ${cognitoUser.getUsername()}`)
// })

/*
  ? Helpful Links:
  (Amazon Cognito Identity NPM Package)[https://www.npmjs.com/package/amazon-cognito-identity-js]
  (Example Code from AWS Docs)[https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html]
  (Tutorial from AWS Docs)[https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-integrating-user-pools-javascript.html]
*/

// ? Created a promise based helper fxn

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

// ? EXAMPLE USE OF HELPER FXN
createCognitoUser({ username: 'from1My@function.com', password: 'PASSword1987!', email: 'from1My@function.com', phone: ''})
  .then(data => console.log(data))
  .catch(e => console.log(e))

module.exports = {
  createCognitoUser
}
