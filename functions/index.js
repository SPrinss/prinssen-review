const functions = require('firebase-functions');
const {findTitles, findPersons, addPerson, deletePersonById, indexPerformanceTitles} = require('./firebase-functions-connector');



exports.findTitles = functions.https.onCall(findTitles)
exports.findPersons = functions.https.onCall(findPersons)
exports.addPerson = functions.https.onCall(addPerson)
exports.deletePersonById = functions.https.onCall(deletePersonById)
exports.indexPerformanceTitles = functions.https.onCall(indexPerformanceTitles)

