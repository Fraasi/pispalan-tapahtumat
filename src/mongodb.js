import * as Realm from "realm-web";

const app = new Realm.App({ id: 'tapahtumat-api-lffsa' });
const credentials = Realm.Credentials.anonymous();


const fetchData = async () => {

  try {
    await app.logIn(credentials);
    const dbData = await app.currentUser
    .mongoClient('mongodb-atlas')
    .db('tapahtumat')
    .collection('pispala')
    .find({})
    .catch(console.error)
    return dbData[0].data
  } catch (error) {
    if (error) console.log('error:', error)
  }

}
export default fetchData
