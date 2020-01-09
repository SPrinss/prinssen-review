const PerformanceDAOClass = require('../daos/PerformanceDAO');

async function findList(namePart, config = {}) {
  const PerformanceDAO = new PerformanceDAOClass(config);
  const performances = await PerformanceDAO.searchList('performances', 'title', namePart);
  return performances;
}

async function findTitlesList(namePart, config = {}) {
  const PerformanceDAO = new PerformanceDAOClass(config);
  const performances = await PerformanceDAO.searchList('titles', 'title', namePart);
  return performances;
}

async function add(performance, config = {}) {
  const PerformanceDAO = new PerformanceDAOClass(config);
  return await PerformanceDAO.appendToList('performances', performance);
}

async function addTitle(titleData, config = {}) {
  const PerformanceDAO = new PerformanceDAOClass(config);
  return await PerformanceDAO.appendToList('titles', titleData);
}

async function deleteById(id, config = {}) {
  const PerformanceDAO = new PerformanceDAOClass(config);
  const res = await PerformanceDAO.deleteByListAndDataId('performances', id);
  return res;
}

exports.findList = findList;
exports.findTitlesList = findTitlesList;
exports.add = add;
exports.addTitle = addTitle;
exports.deleteById = deleteById;