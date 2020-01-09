
const { Client } = require('@elastic/elasticsearch');

let ELASTIC_CLIENT;

class PerformanceDAO {
  constructor(data) {
    ELASTIC_CLIENT = new Client(
      { 
        node: data.url,
        auth: {
          username: data.username,
          password: data.password
        }
      }
    )
  }

  async searchList (list = 'performances', key, namePart) {
    const { body } = await ELASTIC_CLIENT.search({
      index: list,
      body: {
        query: {
          match_phrase_prefix: {
            [key]: namePart
          }
        }
      }
    }).catch(err => console.log(err))
    const persons = [];
    if(!body || !body.hits || !body.hits.hits) return persons;
    
    body.hits.hits.forEach(hit => {
      persons.push(hit._source);
    });

    return persons;
  }

  async appendToList (listName, item) {
    const res = await ELASTIC_CLIENT.index({
      index: listName,
      body: item
    });

    return res.statusCode;
  }

  async deleteByListAndDataId(list, id) {
    const res = await ELASTIC_CLIENT.deleteByQuery({
      index: list,
      body: {
        query: {
          match: {
            id: id
          }
        }
      }
    });
    return res.statusCode;
  }

}

module.exports = PerformanceDAO;