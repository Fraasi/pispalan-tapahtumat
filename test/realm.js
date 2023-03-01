import * as Realm from "realm-web";

// Add your App ID
const app = new Realm.App({ id: 'tapahtumat-api-lffsa' });

// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();

// Authenticate the user
const user = await app.logIn(credentials);
// `App.currentUser` updates to match the logged in user
console.assert(user.id === app.currentUser.id);

const fetchData = async () => {
  try {
    const dbData = await app.currentUser
      .mongoClient('mongodb-atlas')
      .db('tapahtumat')
      .collection('pispala')
      .find({})
      .catch(console.error)
    console.log('dbdata', dbData)
  } catch (error) {
    if (error) console.log('error:', error)
  }

}
fetchData()
