const PersonDAOClass = require('../daos/PersonDAO');


async function findList(namePart, config = {}) {
  const PersonDAO = new PersonDAOClass(config);
  const persons = await PersonDAO.searchList(namePart);
  return persons;
}

async function add(person, config = {}) {
  const PersonDAO = new PersonDAOClass(config);
  const persons = await PersonDAO.appendToList('persons', person);
  return persons;
}

async function deleteById(id, config = {}) {
  const PersonDAO = new PersonDAOClass(config);
  const res = await PersonDAO.deleteByListAndDataId('persons', id);
  return res;
}

exports.findList = findList;
exports.add = add;
exports.deleteById = deleteById;