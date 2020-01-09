const {PersonController, PerformanceController} = require('./api');
const admin = require('firebase-admin');
const config = require('./config/config.json');
const firebaseConfig = require('./config/firebase_config.json');
const firebaseServiceCredentials = require('./config/firebase-service-account-keys.json');
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceCredentials),
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket
});

async function findTitles (data, context) {
  const namePart = data.string;
  const persons = await PerformanceController.findTitlesList(namePart, config.elastic);
  return persons;
}

async function findPersons (data, context) {
  const namePart = data.string;
  const persons = await PersonController.findList(namePart, config.elastic);
  return persons;
}

async function addPerson (data, context) {
  const person = data.person;
  const id = await PersonController.add(person, config.elastic);
  return id;
}

async function addTitle (data, context) {
  const person = data.person;
  const id = await PersonController.add(person, config.elastic);
  return id;
}

async function deletePersonById (data, context) {
  const id = data.id;
  const res = await PersonController.deleteById(id, config.elastic);
  return res;
}

async function indexPerformanceTitles() {
  // const ref = await firebaseApp.firestore().collection('performances').get();
  // const performances = [];
  // ref.forEach(item => {
  //   const data = item.data();
  //   data.id = item.id;
  //   performances.push(data)
  // })

  // await Promise.all(performances.map(performance => {
  //   return PerformanceController.addTitle({id: performance.id, title: performance.name}, config.elastic);
  // }))
}



exports.findTitles = findTitles;
exports.findPersons = findPersons;
exports.addPerson = addPerson;
exports.deletePersonById = deletePersonById;
exports.indexPerformanceTitles = indexPerformanceTitles;
